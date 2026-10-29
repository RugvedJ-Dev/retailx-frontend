// Shared API contract with the FastAPI backend (see backend README "API" section).

export type SessionUser = { id: string; name: string; email: string }

export type Thread = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export type ChartSpec = {
  id: string
  type: "line" | "bar" | "pie"
  title: string
  x_key: string
  series: { key: string; label: string }[]
  data: Record<string, string | number>[]
  currency: string
}

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  charts: ChartSpec[]
  created_at: string
}

export type Approval = {
  approval_id: string
  thread_id: string
  status: string
  operation: "insert_sale" | "update_sales" | "delete_sales" | string
  summary: string
  details: Record<string, unknown>
  destructive: boolean
  warnings: string[]
  expires_at: string
}

export type PlanStepInfo = {
  id: string
  title: string
  action: string
  requires_approval: boolean
}

export type ThreadDetail = {
  thread: Thread
  messages: Message[]
  pending_approval: Approval | null
}

/** Events streamed over SSE from POST /threads/{id}/chat and /approvals/{id}. */
export type AgentEvent =
  | { type: "run_started"; run_id: string }
  | { type: "plan"; steps: PlanStepInfo[] }
  | { type: "step_started"; id: string; title: string; action: string }
  | { type: "step_completed"; id: string; title: string; summary: string }
  | { type: "step_failed"; id: string; title: string; error: string }
  | { type: "chart"; chart: ChartSpec }
  | { type: "token"; text: string }
  | { type: "approval_required"; approval: Approval }
  | { type: "approval_resolved"; decision: "approve" | "reject"; step_id: string }
  | { type: "message_complete"; message: Message }
  | { type: "error"; code: string; message: string }
  | { type: "done" }
