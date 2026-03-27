export type ErrorCategory = 'validation' | 'rate_limit' | 'provider' | 'internal'

export interface ScriptGenerationRequest {
  theme: string
  locale: string
  requestId?: string
}

export interface ScriptGenerationResponse {
  yaml: string
  requestId: string
  generatedAt: string
}

export interface RateLimitPolicy {
  windowSec: number
  maxRequests: number
  keyStrategy: 'ip' | 'client_id'
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSec?: number
}

export interface ProviderRequest {
  prompt: string
  model: string
  temperature?: number
}

export interface ProviderResponse {
  rawText: string
  usage?: { inputTokens: number; outputTokens: number }
}

export interface ApiErrorEnvelope {
  category: ErrorCategory
  code: string
  message: string
  requestId: string
}

export interface ScriptSuccessEnvelope extends ScriptGenerationResponse {
  success: true
}

export interface ScriptErrorEnvelope extends ApiErrorEnvelope {
  success: false
}

export type ScriptApiResponse = ScriptSuccessEnvelope | ScriptErrorEnvelope

export interface ValidationIssue {
  code: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  issues: ValidationIssue[]
}

export interface EnvLike {
  ALLOWED_ORIGIN?: string
  DEFAULT_MODEL?: string
  CLAUDE_API_KEY?: string
  RATE_LIMIT_MAX?: string
  RATE_LIMIT_WINDOW_SEC?: string
  PROVIDER_TIMEOUT_MS?: string
  PROVIDER_RETRY_MAX?: string
}
