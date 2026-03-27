import type { ScriptGenerationRequest, ValidationResult } from './types'

const MAX_THEME_LENGTH = 120
const ALLOWED_LOCALES = new Set(['ja-JP', 'en-US'])
const THEME_PATTERN = /^[\p{L}\p{N}\p{P}\p{Zs}\p{Emoji_Presentation}]+$/u

export function validateRequestBody(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object') {
    return issue('INVALID_BODY', 'Request body must be a JSON object.')
  }

  const req = input as Partial<ScriptGenerationRequest>
  const issues = []

  if (typeof req.theme !== 'string' || req.theme.trim().length === 0) {
    issues.push({ code: 'THEME_REQUIRED', message: 'theme is required.' })
  } else {
    if (req.theme.trim().length > MAX_THEME_LENGTH) {
      issues.push({ code: 'THEME_TOO_LONG', message: `theme must be <= ${MAX_THEME_LENGTH} chars.` })
    }
    if (!THEME_PATTERN.test(req.theme.trim())) {
      issues.push({ code: 'THEME_INVALID_CHARS', message: 'theme contains unsupported characters.' })
    }
  }

  if (typeof req.locale !== 'string' || !ALLOWED_LOCALES.has(req.locale)) {
    issues.push({ code: 'LOCALE_INVALID', message: 'locale must be one of ja-JP or en-US.' })
  }

  return { isValid: issues.length === 0, issues }
}

function issue(code: string, message: string): ValidationResult {
  return { isValid: false, issues: [{ code, message }] }
}
