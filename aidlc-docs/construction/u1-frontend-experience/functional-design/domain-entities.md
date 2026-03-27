# Domain Entities - u1-frontend-experience

## ThemeInput
- **Fields**:
  - `value: string`
  - `isValid: boolean`
  - `errors: string[]`
- **Purpose**: 台本生成の入力テーマを表現

## ScriptDocument
- **Fields**:
  - `yamlText: string`
  - `lastUpdatedAt: string`
- **Purpose**: 編集中のYAML本文

## ValidationReport
- **Fields**:
  - `isValid: boolean`
  - `errors: ValidationIssue[]`
  - `warnings: ValidationIssue[]`
- **Purpose**: YAML検証結果

## ValidationIssue
- **Fields**:
  - `code: string`
  - `message: string`
  - `line?: number`
  - `path?: string`
  - `severity: "error" | "warning"`
- **Purpose**: 個別検証問題の表現

## SceneViewModel
- **Fields**:
  - `sceneId: number`
  - `backgroundKey: string`
  - `textOnBoard: string`
  - `dialogue: string`
  - `characters: CharacterViewModel[]`
  - `durationSec: number`
- **Purpose**: プレビュー描画用シーンデータ

## CharacterViewModel
- **Fields**:
  - `name: string`
  - `position: string`
  - `expression: string`
- **Purpose**: シーン内キャラ表示データ

## PreviewState
- **Fields**:
  - `selectedSceneIndex: number`
  - `renderStatus: "idle" | "rendering" | "ready" | "error"`
  - `lastRenderError?: string`
- **Purpose**: プレビュー状態管理

## UiStateAggregate
- **Fields**:
  - `themeInput: ThemeInput`
  - `scriptDocument: ScriptDocument`
  - `validationReport: ValidationReport`
  - `previewState: PreviewState`
  - `phase: "idle" | "generating" | "editing" | "error"`
- **Purpose**: U1全体の状態集約
