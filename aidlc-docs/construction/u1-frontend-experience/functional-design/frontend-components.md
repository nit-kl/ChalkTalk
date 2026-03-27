# Frontend Components - u1-frontend-experience

## Component Hierarchy

- `AppShell`
  - `ThemeInputSection`
  - `ScriptEditorSection`
  - `ValidationPanel`
  - `PreviewSection`
    - `SceneNavigator`
    - `SceneCanvas`
  - `StatusBanner`

## Component Responsibilities

## AppShell
- 全体レイアウト管理
- Store連携と状態配線

## ThemeInputSection
- テーマ入力UI
- 生成開始アクション

## ScriptEditorSection
- YAML編集UI
- 編集イベント通知

## ValidationPanel
- 検証エラー/警告表示
- 行情報と内容表示

## PreviewSection
- プレビュー領域管理
- 選択シーンに応じた再描画トリガー

## SceneNavigator
- シーン番号選択
- 前後遷移

## SceneCanvas
- 背景/立ち絵/文字の描画結果表示

## StatusBanner
- 生成中/失敗/成功などの状態表示

## Props and State (High-Level)

- `ThemeInputSection`
  - props: `theme`, `canGenerate`, `onThemeChange`, `onGenerate`
- `ScriptEditorSection`
  - props: `yaml`, `onYamlChange`
- `ValidationPanel`
  - props: `report`
- `SceneNavigator`
  - props: `scenes`, `selectedIndex`, `onSelectScene`
- `SceneCanvas`
  - props: `scene`, `resolvedAssets`, `renderStatus`

## User Interaction Flows

1. テーマ入力 -> 生成要求 -> 状態表示更新
2. YAML編集 -> 検証実行 -> エラー表示更新
3. シーン選択 -> プレビュー再描画
4. 検証エラー解消後 -> PreviewReadyへ遷移

## Form Validation Rules

- テーマ: 必須、最大長チェック
- YAML: 構文、必須キー、型、列挙値

## API Integration Points

- `ThemeInputSection` -> `ScriptGenerationService`（U2の生成API起動）
- `ScriptEditorSection` -> `ScriptValidationEngine`（ローカル検証）
- `PreviewSection` -> `AssetManifestResolver`（アセット解決）
