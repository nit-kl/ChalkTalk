import { describe, expect, it } from 'vitest'
import { handleGenerateScript } from '../services/script-service'

const telemetry = { recordEvent: () => undefined }

describe('handleGenerateScript', () => {
  it('returns 400 for invalid input', async () => {
    const result = await handleGenerateScript({
      request: new Request('https://example.com/api/script/generate', { method: 'POST' }),
      body: { theme: '', locale: 'ja-JP' },
      env: {},
      telemetry,
    })
    expect(result.status).toBe(400)
    expect(result.response.success).toBe(false)
  })

  it('returns success envelope with fallback provider when api key missing', async () => {
    const result = await handleGenerateScript({
      request: new Request('https://example.com/api/script/generate', {
        method: 'POST',
        headers: { 'cf-connecting-ip': '127.0.0.1' },
      }),
      body: { theme: '微分の基礎', locale: 'ja-JP' },
      env: { RATE_LIMIT_MAX: '5', RATE_LIMIT_WINDOW_SEC: '60' },
      telemetry,
    })
    expect(result.status).toBe(200)
    expect(result.response.success).toBe(true)
    if (result.response.success) {
      expect(result.response.yaml).toContain('title:')
      expect(result.response.requestId).toBeTruthy()
    }
  })
})
