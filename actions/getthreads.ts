"use server"
import Thread from "@/models/Threads"


export const getThreads = async(id:any) => {
    const allThreads = await Thread.findById(id)
    return allThreads
}