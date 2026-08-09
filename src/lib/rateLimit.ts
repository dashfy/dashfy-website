import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

import type { RateLimitResult } from '@/lib/rateLimitMemory'
import { MAX_REQUESTS, memoryRateLimit, WINDOW_MS } from '@/lib/rateLimitMemory'

/** Past this, the request is allowed through rather than waiting on Redis. */
const REDIS_TIMEOUT_MS = 1_000
/** Namespaces the keys so the database can be shared with other projects. */
const KEY_PREFIX = 'dashfy:ask-ai'

let limiter: Ratelimit | null | undefined

/**
 * Built on first use, so a deployment without Redis credentials still builds and
 * prerenders — the route just falls back to the in-memory limiter.
 */
const getLimiter = (): Ratelimit | null => {
  if (limiter === undefined) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN

    limiter =
      url && token
        ? new Ratelimit({
            redis: new Redis({ url, token }),
            limiter: Ratelimit.slidingWindow(MAX_REQUESTS, `${WINDOW_MS} ms`),
            timeout: REDIS_TIMEOUT_MS,
            prefix: KEY_PREFIX,
          })
        : null
  }

  return limiter
}

/**
 * Throttles the Ask AI route, which spends real API credit on every call. Upstash
 * keeps one count across every serverless instance; without it the limit is only
 * per instance, which is a speed bump rather than a global cap. Either way, pair
 * this with a spend limit on the OpenAI account.
 */
export const rateLimit = async (client: string): Promise<RateLimitResult> => {
  const upstash = getLimiter()

  if (!upstash) {
    return memoryRateLimit(client)
  }

  try {
    // A slow Redis resolves as allowed once `timeout` elapses, so answering a
    // question never waits on the limiter.
    const { success, reset } = await upstash.limit(client)

    return {
      allowed: success,
      retryAfterSeconds: success ? 0 : Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
    }
  } catch (error) {
    console.warn('Ask AI rate limiting fell back to memory; Redis is unreachable.', error)

    return memoryRateLimit(client)
  }
}
