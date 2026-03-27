import type { UiError } from '../domain/types'

export function toUiError(error: unknown): UiError {
  const message = error instanceof Error ? error.message : '予期しないエラーが発生しました。'
  if (/network|fetch/i.test(message)) {
    return { category: 'api', code: 'NETWORK_ERROR', message: '通信に失敗しました。再試行してください。' }
  }
  return { category: 'api', code: 'UNKNOWN_ERROR', message: '処理に失敗しました。時間をおいて再試行してください。' }
}

