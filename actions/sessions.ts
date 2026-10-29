"use server"

import { redirect } from "next/navigation"

import { backendFetch } from "@/lib/backend"
import { clearToken } from "@/lib/session"
import type { SessionUser } from "@/lib/types"

/** Resolve the signed-in user from the backend (null when signed out / token expired). */
export const getSession = async (): Promise<SessionUser | null> => {
  const res = await backendFetch("/api/auth/me")
  if (res.status === 401) return null
  if (!res.ok) throw new Error("Could not verify your session")
  return res.json()
}

export const deleteSession = async () => {
  await clearToken()
  redirect("/")
}
