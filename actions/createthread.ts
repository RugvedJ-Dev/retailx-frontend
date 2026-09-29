"use server"

import Thread from "@/models/Threads"
import { getSession } from "./sessions"

export const createThread = async (threadName: string) => {
  try {
    const session = await getSession()
    if (!session?._id) {
      return { success: false, error: "Unauthorized" }
    }
    const response = await Thread.create({
      userId: session._id,
      threadname: threadName, 
    })

    if (!response) {
      throw new Error("Error occurred while creating Thread")
    }

    return { success: true, threadId: response._id.toString() }
  } catch (error) {
    console.error("Failed to create thread:", error)

    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    }
  }
}