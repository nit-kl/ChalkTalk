import type { ProviderRequest, ProviderResponse } from '../domain/types'

export interface ProviderClientConfig {
  apiKey?: string
  timeoutMs: number
  retryMax: number
}

export class ProviderError extends Error {
  constructor(message: string, public readonly code: string, public readonly retryable: boolean) {
    super(message)
    this.name = 'ProviderError'
  }
}

export async function invokeProviderWithRetry(
  req: ProviderRequest,
  config: ProviderClientConfig
): Promise<ProviderResponse> {
  let attempts = 0
  let lastError: ProviderError | undefined

  while (attempts <= config.retryMax) {
    attempts += 1
    try {
      return await invokeProvider(req, config)
    } catch (err) {
      const pErr = toProviderError(err)
      lastError = pErr
      if (!pErr.retryable || attempts > config.retryMax) break
    }
  }

  throw lastError ?? new ProviderError('Provider failed.', 'PROVIDER_FAILED', false)
}

async function invokeProvider(req: ProviderRequest, config: ProviderClientConfig): Promise<ProviderResponse> {
  if (!config.apiKey) {
    return { rawText: buildFallbackYaml(req.prompt) }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: req.model,
        max_tokens: 800,
        temperature: req.temperature ?? 0.4,
        messages: [{ role: 'user', content: req.prompt }],
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const retryable = response.status >= 500 || response.status === 429
      throw new ProviderError(`Provider status ${response.status}`, 'PROVIDER_BAD_STATUS', retryable)
    }

    const data = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>
      usage?: { input_tokens?: number; output_tokens?: number }
    }
    const text = data.content?.find((x) => x.type === 'text')?.text?.trim()
    if (!text) throw new ProviderError('Provider response text missing.', 'PROVIDER_EMPTY_TEXT', false)

    return {
      rawText: text,
      usage: data.usage
        ? {
            inputTokens: data.usage.input_tokens ?? 0,
            outputTokens: data.usage.output_tokens ?? 0,
          }
        : undefined,
    }
  } catch (err) {
    if (err instanceof ProviderError) throw err
    if (err instanceof Error && err.name === 'AbortError') {
      throw new ProviderError('Provider request timed out.', 'PROVIDER_TIMEOUT', true)
    }
    throw new ProviderError('Provider invocation failed.', 'PROVIDER_INVOCATION_FAILED', true)
  } finally {
    clearTimeout(timeout)
  }
}

function toProviderError(err: unknown): ProviderError {
  if (err instanceof ProviderError) return err
  return new ProviderError('Provider invocation failed.', 'PROVIDER_UNKNOWN', true)
}

function buildFallbackYaml(prompt: string): string {
  const safeTheme = prompt.replace(/^.*テーマ:\s*/m, '').split('\n')[0]?.trim() || 'サンプル'
  return `title: "${safeTheme}"
scenes:
  - id: 1
    background: "blackboard"
    text_on_board: "${safeTheme}"
    dialogue: "このテーマについて説明します。"
    duration: 4
    characters:
      - name: "sensei"
        position: "right"
        expression: "smile"
`
}
