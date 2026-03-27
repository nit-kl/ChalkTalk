import { describe, expect, it, beforeEach } from 'vitest'
import { __resetRateLimiterForTest, checkRateLimit } from '../services/rate-limiter'

describe('checkRateLimit', () => {
  beforeEach(() => {
    __resetRateLimiterForTest()
  })

  it('allows within limit and then blocks', () => {
    const policy = { windowSec: 60, maxRequests: 2, keyStrategy: 'ip' as const }
    const t = 1000
    expect(checkRateLimit('k', t, policy).allowed).toBe(true)
    expect(checkRateLimit('k', t + 1, policy).allowed).toBe(true)
    const blocked = checkRateLimit('k', t + 2, policy)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSec).toBeGreaterThan(0)
  })
})
