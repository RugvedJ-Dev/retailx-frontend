import type { NextRequest } from "next/server"

import { BACKEND_URL } from "@/lib/backend"
import { readToken } from "@/lib/session"

export const dynamic = "force-dynamic"

const SEGMENT = /^[A-Za-z0-9_-]+$/

/**
 * Same-origin proxy so the browser can call the thread/chat APIs (including SSE streaming)
 * without ever seeing the JWT: the httpOnly cookie is turned into a Bearer header here.
 * Only /threads/** is exposed; auth endpoints are reached through server actions instead.
 */
async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params
  if (path[0] !== "threads" || !path.every((segment) => SEGMENT.test(segment))) {
    return Response.json({ detail: "Not found" }, { status: 404 })
  }
  const token = await readToken()
  if (!token) return Response.json({ detail: "Not authenticated" }, { status: 401 })

  const hasBody = !["GET", "HEAD", "DELETE"].includes(req.method)
  // Requiring JSON forces a CORS preflight for cross-site callers (CSRF defence in depth).
  if (hasBody && !req.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ detail: "Unsupported content type" }, { status: 415 })
  }

  let upstream: Response
  try {
    upstream = await fetch(`${BACKEND_URL}/api/${path.join("/")}`, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: req.headers.get("accept") ?? "application/json",
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
      body: hasBody ? await req.text() : undefined,
      cache: "no-store",
      signal: req.signal,
    })
  } catch {
    return Response.json({ detail: "The RetailX service is unreachable" }, { status: 502 })
  }

  const headers = new Headers()
  const contentType = upstream.headers.get("content-type")
  if (contentType) headers.set("Content-Type", contentType)
  headers.set("Cache-Control", "no-store, no-transform")
  headers.set("X-Accel-Buffering", "no")
  return new Response(upstream.body, { status: upstream.status, headers })
}

export const GET = proxy
export const POST = proxy
export const DELETE = proxy
