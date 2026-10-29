"use server"

import { redirect } from "next/navigation"

import { BackendUnavailableError, backendFetch, errorMessage } from "@/lib/backend"
import { writeToken } from "@/lib/session"

export const userRegister = async (name: string, email: string, password: string) => {
  try {
    const res = await backendFetch("/api/auth/register", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) return { error: await errorMessage(res, "Failed to create account.") }
    await writeToken((await res.json()).access_token)
  } catch (error) {
    if (error instanceof BackendUnavailableError) return { error: error.message }
    console.error("Registration error:", error)
    return { error: "Failed to create user account." }
  }
  redirect("/dashboard")
}
