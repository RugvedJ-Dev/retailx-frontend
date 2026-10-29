import "server-only"

import { cookies } from "next/headers"

/**
 * The backend-issued JWT lives in an httpOnly cookie, so page scripts (and any XSS) can never
 * read it. Only server code (actions, route handlers, server components) attaches it.
 */
export const TOKEN_COOKIE = "rx_token"

export async function readToken(): Promise<string | null> {
  return (await cookies()).get(TOKEN_COOKIE)?.value ?? null
}

export async function writeToken(token: string): Promise<void> {
  ;(await cookies()).set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12, // matches the backend's 720 minute default token lifetime
    path: "/",
  })
}

export async function clearToken(): Promise<void> {
  ;(await cookies()).delete(TOKEN_COOKIE)
}
