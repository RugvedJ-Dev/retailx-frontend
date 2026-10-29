"use server"

import { redirect } from "next/navigation"

import { BackendUnavailableError, backendFetch, errorMessage } from "@/lib/backend"
import { writeToken } from "@/lib/session"

export const userLogin = async (email: string, password: string) => {
  try {
    const res = await backendFetch("/api/auth/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) return { error: await errorMessage(res, "Could not sign in.") }
    await writeToken((await res.json()).access_token)
  } catch (error) {
    if (error instanceof BackendUnavailableError) return { error: error.message }
    console.error("Authentication error:", error)
    return { error: "An unexpected error occurred." }
  }
  redirect("/dashboard")
}
