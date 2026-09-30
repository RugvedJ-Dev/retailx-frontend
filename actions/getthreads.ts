"use server"
import Thread from "@/models/Threads"


export const getThreads = async (id: any) => {
  const allThreads = await Thread.find({userId:id})
    return allThreads
}
