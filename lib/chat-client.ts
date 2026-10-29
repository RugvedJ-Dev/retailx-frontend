import { readSSE } from "./sse"
import type { AgentEvent, ThreadDetail } from "./types"

const BASE = "/api/backend/threads"

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

async function detailOf(res: Response): Promise<string> {
  if (res.status === 401) return "Your session has expired. Please sign in again."
  try {
    const body = await res.json()
    if (typeof body?.detail === "string") return body.detail
    if (Array.isArray(body?.detail) && body.detail[0]?.msg) {
      return String(body.detail[0].msg).replace(/^Value error, /, "")
    }
  } catch {
    /* ignore */
  }
  return `Request failed (${res.status})`
}

async function streamPost(
  url: string,
  body: unknown,
  onEvent: (event: AgentEvent) => void,
): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new ApiError(res.status, await detailOf(res))
  for await (const event of readSSE(res)) onEvent(event)
}

export const sendMessage = (threadId: string, message: string, onEvent: (e: AgentEvent) => void) =>
  streamPost(`${BASE}/${encodeURIComponent(threadId)}/chat`, { message }, onEvent)

export const sendDecision = (
  threadId: string,
  approvalId: string,
  decision: "approve" | "reject",
  onEvent: (e: AgentEvent) => void,
) =>
  streamPost(
    `${BASE}/${encodeURIComponent(threadId)}/approvals/${encodeURIComponent(approvalId)}`,
    { decision },
    onEvent,
  )

export async function fetchThread(threadId: string): Promise<ThreadDetail> {
  const res = await fetch(`${BASE}/${encodeURIComponent(threadId)}`, { cache: "no-store" })
  if (!res.ok) throw new ApiError(res.status, await detailOf(res))
  return res.json()
}
