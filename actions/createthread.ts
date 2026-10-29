"use server"

import { BackendUnavailableError, backendFetch, errorMessage } from "@/lib/backend"

export const createThread = async (threadName: string) => {
  try {
    const res = await backendFetch("/api/threads", {
      method: "POST",
      body: JSON.stringify({ name: threadName }),
    })
    if (res.status === 401) return { success: false as const, error: "Unauthorized" }
    if (!res.ok) return { success: false as const, error: await errorMessage(res) }
    const thread = await res.json()
    return { success: true as const, threadId: thread.id as string }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof BackendUnavailableError ? error.message : "Internal Server Error",
    }
  }
}
