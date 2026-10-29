import type { AgentEvent, Approval, ChartSpec, Message } from "./types"

export type StepStatus = "pending" | "awaiting_approval" | "running" | "done" | "failed"
export type StepView = {
  id: string
  title: string
  requiresApproval: boolean
  status: StepStatus
  detail?: string
}
export type ChatStatus = "idle" | "running" | "awaiting_approval"

export type ChatState = {
  messages: Message[]
  steps: StepView[]
  streamingText: string
  liveCharts: ChartSpec[]
  pendingApproval: Approval | null
  status: ChatStatus
  error: string | null
}

export type ChatAction =
  | { type: "hydrate"; messages: Message[]; pendingApproval: Approval | null }
  | { type: "user_sent"; id: string; text: string }
  | { type: "decision_sent" }
  | { type: "failed"; error: string }
  | { type: "event"; event: AgentEvent }

export function initialState(
  messages: Message[] = [],
  pendingApproval: Approval | null = null,
): ChatState {
  return {
    messages,
    steps: [],
    streamingText: "",
    liveCharts: [],
    pendingApproval,
    status: pendingApproval ? "awaiting_approval" : "idle",
    error: null,
  }
}

function setStep(steps: StepView[], id: string, patch: Partial<StepView>): StepView[] {
  return steps.map((s) => (s.id === id ? { ...s, ...patch } : s))
}

function withMessage(messages: Message[], message: Message): Message[] {
  return messages.some((m) => m.id === message.id) ? messages : [...messages, message]
}

function reduceEvent(state: ChatState, event: AgentEvent): ChatState {
  switch (event.type) {
    case "plan":
      return {
        ...state,
        steps: event.steps.map((s) => ({
          id: s.id,
          title: s.title,
          requiresApproval: s.requires_approval,
          status: "pending" as const,
        })),
      }
    case "step_started":
      return { ...state, steps: setStep(state.steps, event.id, { status: "running" }) }
    case "step_completed":
      return {
        ...state,
        steps: setStep(state.steps, event.id, { status: "done", detail: event.summary }),
      }
    case "step_failed":
      return {
        ...state,
        steps: setStep(state.steps, event.id, { status: "failed", detail: event.error }),
      }
    case "chart":
      return { ...state, liveCharts: [...state.liveCharts, event.chart] }
    case "token":
      return { ...state, streamingText: state.streamingText + event.text }
    case "approval_required": {
      const waiting = state.steps.find((s) => s.requiresApproval && s.status === "pending")
      return {
        ...state,
        status: "awaiting_approval",
        pendingApproval: event.approval,
        streamingText: "",
        steps: waiting ? setStep(state.steps, waiting.id, { status: "awaiting_approval" }) : state.steps,
        messages: withMessage(state.messages, {
          id: `approval-${event.approval.approval_id}`,
          role: "assistant",
          content: `I need your approval to: ${event.approval.summary}`,
          charts: [],
          created_at: new Date().toISOString(),
        }),
      }
    }
    case "approval_resolved":
      return { ...state, status: "running", pendingApproval: null }
    case "message_complete":
      return {
        ...state,
        messages: withMessage(state.messages, event.message),
        streamingText: "",
        liveCharts: [],
        pendingApproval: null,
        status: "idle",
      }
    case "error":
      return { ...state, status: "idle", streamingText: "", error: event.message }
    case "done":
      return state.status === "running" ? { ...state, status: "idle" } : state
    case "run_started":
    default:
      return state
  }
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        messages: action.messages,
        pendingApproval: action.pendingApproval,
        status: action.pendingApproval ? "awaiting_approval" : "idle",
        streamingText: "",
        liveCharts: [],
        error: null,
      }
    case "user_sent":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: action.id,
            role: "user",
            content: action.text,
            charts: [],
            created_at: new Date().toISOString(),
          },
        ],
        steps: [],
        streamingText: "",
        liveCharts: [],
        status: "running",
        error: null,
      }
    case "decision_sent":
      return { ...state, pendingApproval: null, status: "running", error: null }
    case "failed":
      return {
        ...state,
        status: state.pendingApproval ? "awaiting_approval" : "idle",
        streamingText: "",
        error: action.error,
      }
    case "event":
      return reduceEvent(state, action.event)
  }
}
