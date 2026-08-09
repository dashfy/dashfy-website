export const WINDOW_MS = 60_000
export const MAX_REQUESTS = 8
/** Prevents the map from growing without bound when many one-off clients hit the route. */
const MAX_TRACKED_CLIENTS = 5_000

const timestampsByClient = new Map<string, number[]>()

const prune = (now: number) => {
  for (const [client, timestamps] of timestampsByClient) {
    const recent = timestamps.filter((timestamp) => now - timestamp < WINDOW_MS)

    if (recent.length === 0) {
      timestampsByClient.delete(client)
    } else {
      timestampsByClient.set(client, recent)
    }
  }
}

export interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds: number
}

/**
 * Sliding window limiter kept in the instance's memory. It backs `rateLimit`
 * whenever Upstash is unconfigured (local development, previews) or unreachable,
 * so it throttles a single abusive client rather than guaranteeing a global cap.
 */
export const memoryRateLimit = (client: string): RateLimitResult => {
  const now = Date.now()

  if (timestampsByClient.size > MAX_TRACKED_CLIENTS) {
    prune(now)
  }

  const recent = (timestampsByClient.get(client) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  )

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0] ?? now

    timestampsByClient.set(client, recent)

    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    }
  }

  recent.push(now)
  timestampsByClient.set(client, recent)

  return { allowed: true, retryAfterSeconds: 0 }
}
