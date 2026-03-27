import { describe, expect, it } from 'vitest'
import { AppError, toErrorEnvelope } from '../services/error-envelope'
import { ProviderError } from '../services/provider-client'

describe('toErrorEnvelope', () => {
  it('maps app validation error safely', () => {
    const result = toErrorEnvelope(new AppError('validation', 'THEME_REQUIRED', 'theme required'), 'r1')
    expect(result.category).toBe('validation')
    expect(result.code).toBe('THEME_REQUIRED')
    expect(result.requestId).toBe('r1')
  })

  it('masks provider details', () => {
    const result = toErrorEnvelope(new ProviderError('internal detail', 'PROVIDER_TIMEOUT', true), 'r2')
    expect(result.category).toBe('provider')
    expect(result.message).toBe('AI provider is temporarily unavailable.')
  })
})
