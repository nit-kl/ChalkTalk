import type { ApiErrorEnvelope, ErrorCategory } from '../domain/types'
import type { ProviderError } from './provider-client'

export class AppError extends Error {
  constructor(
    public readonly category: ErrorCategory,
    public readonly code: string,
    message: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function toErrorEnvelope(error: unknown, requestId: string): ApiErrorEnvelope {
  if (error instanceof AppError) {
    return {
      category: error.category,
      code: error.code,
      message: safeMessage(error.category, error.message),
      requestId,
    }
  }

  if (isProviderError(error)) {
    return {
      category: 'provider',
      code: error.code,
      message: 'AI provider is temporarily unavailable.',
      requestId,
    }
  }

  return {
    category: 'internal',
    code: 'INTERNAL_ERROR',
    message: 'Unexpected error occurred.',
    requestId,
  }
}

function safeMessage(category: ErrorCategory, raw: string): string {
  if (category === 'internal' || category === 'provider') return 'Request processing failed.'
  return raw
}

function isProviderError(error: unknown): error is ProviderError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'retryable' in error &&
    typeof (error as { code: unknown }).code === 'string'
  )
}
