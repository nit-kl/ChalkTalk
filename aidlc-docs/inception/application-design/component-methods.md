# Component Methods

## ThemeInputPanel
- `onThemeChanged(theme: string): void`
  - 入力変更を状態層へ通知
- `onGenerateRequested(theme: string): void`
  - 生成開始要求をアプリサービスへ通知

## ScriptGenerationClient
- `generateScript(input: { theme: string; locale: string; }): Promise<{ yaml: string; requestId: string; }>`
  - 台本生成APIを呼び出し、YAMLを取得
- `mapError(error: unknown): { code: string; message: string; retryable: boolean; }`
  - エラーをUI表示可能な形式へ変換

## YamlEditorPanel
- `setYaml(yaml: string): void`
  - エディタ初期値または更新値をセット
- `getYaml(): string`
  - 現在編集中のYAMLを取得
- `onYamlChanged(yaml: string): void`
  - 編集差分を状態層へ通知

## ScriptValidationEngine
- `validate(yaml: string): ValidationReport`
  - 構文/必須項目/型/列挙値を検証
- `parseToScenes(yaml: string): Scene[]`
  - 正常時にシーン配列へ変換

## AssetManifestResolver
- `loadManifest(url: string): Promise<AssetManifest>`
  - マニフェストを読込
- `resolveBackground(key: string): AssetRef`
  - 背景キーを実アセットへ解決
- `resolveExpression(character: string, expression: string): AssetRef`
  - キャラ表情キーを実アセットへ解決

## ScenePreviewCanvas
- `renderScene(scene: Scene, assets: ResolvedAssets): Promise<void>`
  - 単一シーン描画
- `clear(): void`
  - キャンバスクリア

## VideoRenderEngine
- `renderVideo(script: SceneScript): Promise<{ blob: Blob; durationMs: number; }>`
  - シーン群を順次描画しWebM生成
- `abort(): void`
  - 生成中断

## DownloadManager
- `prepareDownload(blob: Blob, filename: string): { url: string; filename: string; }`
  - ダウンロード用URL生成
- `revoke(url: string): void`
  - リソース解放

## AppStateStore
- `dispatch(action: AppAction): void`
  - 状態更新アクション適用
- `getState(): AppState`
  - 現在状態を取得
