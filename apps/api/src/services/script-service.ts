import { validateGeneratedYaml } from '../domain/yaml-contract'
import { validateRequestBody } from '../domain/validation'
import type {
  EnvLike,
  RateLimitPolicy,
  ScriptApiResponse,
  ScriptGenerationRequest,
  ScriptGenerationResponse,
} from '../domain/types'
import { AppError, toErrorEnvelope } from './error-envelope'
import { invokeProviderWithRetry } from './provider-client'
import { buildRateLimitKey, checkRateLimit } from './rate-limiter'
import type { Telemetry } from './telemetry'

export async function handleGenerateScript(params: {
  request: Request
  body: unknown
  env: EnvLike
  telemetry: Telemetry
}): Promise<{ status: number; response: ScriptApiResponse; headers?: Record<string, string> }> {
  const requestId = crypto.randomUUID()
  const { request, body, env, telemetry } = params
  const startedAt = Date.now()

  try {
    const validation = validateRequestBody(body)
    if (!validation.isValid) {
      throw new AppError('validation', validation.issues[0]?.code ?? 'VALIDATION_FAILED', validation.issues[0]?.message ?? 'Invalid input.')
    }
    const req = body as ScriptGenerationRequest

    const policy = readPolicy(env)
    const limitKey = buildRateLimitKey(request, policy.keyStrategy)
    const rate = checkRateLimit(limitKey, Date.now(), policy)
    if (!rate.allowed) {
      telemetry.recordEvent('rate_limited', { requestId, retryAfterSec: rate.retryAfterSec ?? 1 })
      return {
        status: 429,
        response: {
          success: false,
          ...toErrorEnvelope(new AppError('rate_limit', 'RATE_LIMIT_EXCEEDED', 'Too many requests.'), requestId),
        },
        headers: { 'retry-after': String(rate.retryAfterSec ?? 1) },
      }
    }

    const model = env.DEFAULT_MODEL || 'claude-3-5-haiku-latest'
    const provider = await invokeProviderWithRetry(
      { prompt: buildPrompt(req.theme, req.locale), model, temperature: 0.4 },
      {
        apiKey: env.CLAUDE_API_KEY,
        timeoutMs: Number(env.PROVIDER_TIMEOUT_MS || 8000),
        retryMax: Number(env.PROVIDER_RETRY_MAX || 1),
      }
    )

    const yamlValidation = validateGeneratedYaml(provider.rawText)
    if (!yamlValidation.isValid) {
      throw new AppError('provider', 'PROVIDER_CONTRACT_VIOLATION', 'Generated YAML did not satisfy minimum schema.')
    }

    const ok: ScriptGenerationResponse = {
      yaml: provider.rawText,
      requestId,
      generatedAt: new Date().toISOString(),
    }
    telemetry.recordEvent('script_generated', { requestId, elapsedMs: Date.now() - startedAt })
    return { status: 200, response: { success: true, ...ok } }
  } catch (error) {
    const envelope = toErrorEnvelope(error, requestId)
    const status = mapErrorToStatus(envelope.category)
    telemetry.recordEvent('script_generate_failed', { requestId, category: envelope.category, code: envelope.code, elapsedMs: Date.now() - startedAt })
    return { status, response: { success: false, ...envelope } }
  }
}

function readPolicy(env: EnvLike): RateLimitPolicy {
  return {
    windowSec: Number(env.RATE_LIMIT_WINDOW_SEC || 60),
    maxRequests: Number(env.RATE_LIMIT_MAX || 30),
    keyStrategy: 'ip',
  }
}

function buildPrompt(theme: string, locale: string): string {
  return [
    `言語: ${locale}`,
    `テーマ: ${theme.trim()}`,
    '以下の最小YAML形式を厳守して台本を1本生成してください。',
    'title: "<title>"',
    'scenes:',
    '  - id: 1',
    '    background: "<key>"',
    '    text_on_board: "<text>"',
    '    dialogue: "<line>"',
    '    duration: 4',
  ].join('\n')
}

function mapErrorToStatus(category: string): number {
  if (category === 'validation') return 400
  if (category === 'rate_limit') return 429
  if (category === 'provider') return 502
  return 500
}
