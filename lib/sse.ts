import type { AgentEvent } from "./types"

/** Parse one SSE block (`event:`/`data:` lines). Comments (heartbeats) and bad JSON yield null. */
export function parseSSEBlock(block: string): AgentEvent | null {
  const data: string[] = []
  for (const line of block.split("\n")) {
    if (line.startsWith("data:")) data.push(line.slice(5).replace(/^ /, ""))
  }
  if (data.length === 0) return null
  try {
    const parsed = JSON.parse(data.join("\n"))
    return parsed && typeof parsed.type === "string" ? (parsed as AgentEvent) : null
  } catch {
    return null
  }
}

/** Incrementally decode a `text/event-stream` response body into typed events. */
export async function* readSSE(res: Response): AsyncGenerator<AgentEvent> {
  if (!res.body) return
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer = (buffer + decoder.decode(value, { stream: true })).replace(/\r\n/g, "\n")
      let end: number
      while ((end = buffer.indexOf("\n\n")) !== -1) {
        const event = parseSSEBlock(buffer.slice(0, end))
        buffer = buffer.slice(end + 2)
        if (event) yield event
      }
    }
    const tail = parseSSEBlock((buffer + decoder.decode()).trim())
    if (tail) yield tail
  } finally {
    reader.releaseLock()
  }
}
