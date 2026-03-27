import { load } from 'js-yaml'
import type { SceneViewModel, ValidationIssue, ValidationReport } from './types'

function issue(
  code: string,
  message: string,
  severity: 'error' | 'warning',
  line?: number,
): ValidationIssue {
  return { code, message, severity, line }
}

export function validateTheme(theme: string): ValidationReport {
  const errors: ValidationIssue[] = []
  const trimmed = theme.trim()
  if (!trimmed) errors.push(issue('THEME_REQUIRED', 'テーマを入力してください。', 'error'))
  if (trimmed.length > 120) {
    errors.push(issue('THEME_TOO_LONG', 'テーマは120文字以内で入力してください。', 'error'))
  }
  return { isValid: errors.length === 0, errors, warnings: [] }
}

export function validateYaml(yamlText: string): ValidationReport {
  const errors: ValidationIssue[] = []
  if (!yamlText.trim()) {
    return {
      isValid: false,
      errors: [issue('YAML_REQUIRED', 'YAMLが空です。', 'error')],
      warnings: [],
    }
  }
  try {
    const doc = load(yamlText) as { scenes?: unknown[] } | undefined
    if (!doc || !Array.isArray(doc.scenes) || doc.scenes.length === 0) {
      errors.push(issue('SCENES_REQUIRED', '`scenes` が必要です。', 'error'))
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'YAML構文エラー'
    const lineMatch = /at line (\d+)/i.exec(message)
    const line = lineMatch ? Number(lineMatch[1]) : undefined
    errors.push(issue('YAML_SYNTAX', message, 'error', line))
  }
  return { isValid: errors.length === 0, errors, warnings: [] }
}

export function parseScenesFromYaml(yamlText: string): SceneViewModel[] {
  const parsed = load(yamlText) as
    | { scenes?: Array<Record<string, unknown>> }
    | undefined
  if (!parsed?.scenes) return []

  return parsed.scenes.map((scene, i) => ({
    sceneId: Number(scene.id ?? i + 1),
    backgroundKey: String(scene.background ?? 'unknown'),
    textOnBoard: String(scene.text_on_board ?? ''),
    dialogue: String(scene.dialogue ?? ''),
    durationSec: Number(scene.duration ?? 3),
    characters: Array.isArray(scene.characters)
      ? scene.characters.map((c) => ({
          name: String((c as Record<string, unknown>).name ?? 'unknown'),
          position: String((c as Record<string, unknown>).position ?? 'center'),
          expression: String((c as Record<string, unknown>).expression ?? 'normal'),
        }))
      : [],
  }))
}

