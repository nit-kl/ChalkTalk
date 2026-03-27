export type AppPhase =
  | 'idle'
  | 'generating'
  | 'editing'
  | 'validating'
  | 'previewReady'
  | 'error'

export interface ValidationIssue {
  code: string
  message: string
  line?: number
  path?: string
  severity: 'error' | 'warning'
}

export interface ValidationReport {
  isValid: boolean
  errors: ValidationIssue[]
  warnings: ValidationIssue[]
}

export interface CharacterViewModel {
  name: string
  position: string
  expression: string
}

export interface SceneViewModel {
  sceneId: number
  backgroundKey: string
  textOnBoard: string
  dialogue: string
  durationSec: number
  characters: CharacterViewModel[]
}

export interface ScriptDocument {
  yamlText: string
  lastUpdatedAt: string
}

export interface UiError {
  category: 'input' | 'validation' | 'api' | 'render'
  code: string
  message: string
}

