# Domain Entities - u2-script-generation-api

## ScriptGenerationRequest
- `theme: string`
- `locale: string`
- `requestId?: string`

## ScriptGenerationResponse
- `yaml: string`
- `requestId: string`
- `generatedAt: string`

## RateLimitPolicy
- `windowSec: number`
- `maxRequests: number`
- `keyStrategy: "ip" | "client_id"`

## RateLimitResult
- `allowed: boolean`
- `remaining: number`
- `retryAfterSec?: number`

## ProviderRequest
- `prompt: string`
- `model: string`
- `temperature?: number`

## ProviderResponse
- `rawText: string`
- `usage?: { inputTokens: number; outputTokens: number }`

## ApiErrorEnvelope
- `category: "validation" | "rate_limit" | "provider" | "internal"`
- `code: string`
- `message: string`
- `requestId: string`
