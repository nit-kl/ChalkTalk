import type { RateLimitPolicy, RateLimitResult } from '../domain/types'

interface BucketState {
  count: number
  expiresAtMs: number
}

const buckets = new Map<string, BucketState>()

export function checkRateLimit(
  key: string,
  nowMs: number,
  policy: RateLimitPolicy
): RateLimitResult {
  const current = buckets.get(key)
  const windowMs = policy.windowSec * 1000

  if (!current || current.expiresAtMs <= nowMs) {
    buckets.set(key, { count: 1, expiresAtMs: nowMs + windowMs })
    return { allowed: true, remaining: Math.max(policy.maxRequests - 1, 0) }
  }

  if (current.count >= policy.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(Math.ceil((current.expiresAtMs - nowMs) / 1000), 1),
    }
  }

  current.count += 1
  buckets.set(key, current)
  return { allowed: true, remaining: Math.max(policy.maxRequests - current.count, 0) }
}

export function buildRateLimitKey(request: Request, strategy: RateLimitPolicy['keyStrategy']): string {
  if (strategy === 'client_id') {
    return request.headers.get('x-client-id') || 'anon-client'
  }
  return request.headers.get('cf-connecting-ip') || 'unknown-ip'
}

export function __resetRateLimiterForTest(): void {
  buckets.clear()
}
