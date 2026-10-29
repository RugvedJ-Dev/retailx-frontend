"use server"

import { backendFetch } from "@/lib/backend"
import type { Thread } from "@/lib/types"

export const getThreads = async (): Promise<Thread[]> => {
  const res = await backendFetch("/api/threads")
  if (!res.ok) throw new Error("Could not load your threads")
  return res.json()
}
