# Services

## S-01 ScriptGenerationService
- **責務**:
  - テーマ入力を受けて台本生成を実行
  - リクエスト状態管理（開始/成功/失敗）
  - レート制限・APIエラーをUI向けに返却
- **連携コンポーネント**:
  - ThemeInputPanel
  - ScriptGenerationClient
  - AppStateStore

## S-02 ScriptEditingService
- **責務**:
  - YAML編集イベントの受け口
  - バリデーション実行トリガー
  - エラー結果の状態反映
- **連携コンポーネント**:
  - YamlEditorPanel
  - ScriptValidationEngine
  - AppStateStore

## S-03 PreviewService
- **責務**:
  - シーン選択とプレビュー描画のオーケストレーション
  - アセット解決失敗時のフォールバック制御
- **連携コンポーネント**:
  - AssetManifestResolver
  - ScenePreviewCanvas
  - AppStateStore

## S-04 VideoExportService
- **責務**:
  - 検証済みスクリプトから動画生成を実行
  - 生成結果をDownloadManagerへ受け渡し
  - 失敗時のリカバリー導線を提供
- **連携コンポーネント**:
  - VideoRenderEngine
  - DownloadManager
  - AppStateStore

## S-05 ManifestBootstrapService
- **責務**:
  - 起動時にアセットマニフェストをロード
  - 必須キー整合を検証
- **連携コンポーネント**:
  - AssetManifestResolver
  - AppStateStore

## オーケストレーションパターン

1. `ScriptGenerationService` がYAML生成を完了
2. `ScriptEditingService` が編集/検証ループを維持
3. `PreviewService` が現在シーンを描画
4. `VideoExportService` が最終出力とダウンロードを提供
