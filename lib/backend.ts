import "server-only"

import { readToken } from "./session"

export const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:8000").replace(/\/$/, "")

export class BackendUnavailableError extends Error {}

type BackendInit = RequestInit & { auth?: boolean }

/** Server-side fetch to the FastAPI backend; attaches the session token from the cookie. */
export async function backendFetch(path: string, init: BackendInit = {}): Promise<Response> {
  const { auth = true, ...rest } = init
  const headers = new Headers(rest.headers)
  if (rest.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json")
  if (auth) {
    const token = await readToken()
    if (token) headers.set("Authorization", `Bearer ${token}`)
  }
  try {
    return await fetch(`${BACKEND_URL}${path}`, { ...rest, headers, cache: "no-store" })
  } catch {
    throw new BackendUnavailableError(
      "Can't reach the RetailX service right now. Please try again shortly.",
    )
  }
}

/** Extract a human-readable message from a FastAPI error response. */
export async function errorMessage(res: Response, fallback = "Something went wrong"): Promise<string> {
  try {
    const body = await res.json()
    const detail = body?.detail
    if (typeof detail === "string") return detail
    if (Array.isArray(detail) && detail[0]?.msg) {
      return String(detail[0].msg).replace(/^Value error, /, "")
    }
  } catch {
    /* fall through */
  }
  return fallback
}
