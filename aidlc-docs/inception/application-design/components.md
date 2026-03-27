# Components

## C-01 ThemeInputPanel
- **目的**: 動画テーマ入力と生成要求トリガー
- **責務**:
  - テーマ文字列入力
  - 文字数/空入力の事前検証
  - 生成開始イベント発火
- **主要インターフェース**:
  - `onGenerateRequested(theme: string): void`
  - `onThemeChanged(theme: string): void`

## C-02 ScriptGenerationClient
- **目的**: 台本生成APIとの通信境界
- **責務**:
  - Workers API呼び出し
  - タイムアウト/失敗ハンドリング
  - レート制限エラー種別の正規化
- **主要インターフェース**:
  - `generateScript(input: ScriptGenerationInput): Promise<ScriptGenerationResult>`

## C-03 YamlEditorPanel
- **目的**: YAML編集体験の提供
- **責務**:
  - YAMLテキスト編集
  - バリデーション結果の表示
  - エラーロケーション表示
- **主要インターフェース**:
  - `setYaml(yaml: string): void`
  - `getYaml(): string`
  - `onYamlChanged(yaml: string): void`

## C-04 ScriptValidationEngine
- **目的**: YAML構文/スキーマ妥当性の検証
- **責務**:
  - パース検証
  - 必須項目検証
  - 列挙値/型検証
- **主要インターフェース**:
  - `validate(yaml: string): ValidationReport`
  - `parseToScenes(yaml: string): Scene[]`

## C-05 AssetManifestResolver
- **目的**: 論理キーをR2配信アセットへ解決
- **責務**:
  - マニフェスト読込
  - background/expression解決
  - 未定義キー検知
- **主要インターフェース**:
  - `resolveBackground(key: string): AssetRef`
  - `resolveExpression(character: string, expression: string): AssetRef`

## C-06 ScenePreviewCanvas
- **目的**: シーン単位プレビュー表示
- **責務**:
  - 背景/立ち絵/テキストの合成表示
  - シーン切替表示
  - 読込失敗時の代替表示
- **主要インターフェース**:
  - `renderScene(scene: Scene, assets: ResolvedAssets): Promise<void>`

## C-07 VideoRenderEngine
- **目的**: 全シーンのフレーム合成と録画
- **責務**:
  - シーン順序制御
  - duration制御
  - MediaRecorder連携
- **主要インターフェース**:
  - `renderVideo(script: SceneScript): Promise<RenderResult>`

## C-08 DownloadManager
- **目的**: 生成動画の保存導線提供
- **責務**:
  - Blob URL生成
  - ファイル名付与
  - 再試行導線
- **主要インターフェース**:
  - `prepareDownload(blob: Blob, filename: string): DownloadHandle`

## C-09 AppStateStore
- **目的**: 画面状態と処理状態の一元管理
- **責務**:
  - テーマ/YAML/バリデーション結果の保持
  - 生成処理状態（idle/running/error/success）保持
  - UIイベントからの状態遷移
- **主要インターフェース**:
  - `dispatch(action: AppAction): void`
  - `select(selector): unknown`
