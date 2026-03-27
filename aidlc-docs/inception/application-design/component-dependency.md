# Component Dependency

## Dependency Matrix

| From | To | Type | Purpose |
|---|---|---|---|
| ThemeInputPanel | ScriptGenerationService | UI -> Service | 生成要求の開始 |
| ScriptGenerationService | ScriptGenerationClient | Service -> Adapter | 台本生成API呼び出し |
| ScriptGenerationService | AppStateStore | Service -> Store | 生成状態の更新 |
| YamlEditorPanel | ScriptEditingService | UI -> Service | 編集内容反映 |
| ScriptEditingService | ScriptValidationEngine | Service -> Domain | YAML検証 |
| ScriptEditingService | AppStateStore | Service -> Store | 検証結果保持 |
| PreviewService | AssetManifestResolver | Service -> Domain | アセット解決 |
| PreviewService | ScenePreviewCanvas | Service -> UI | シーン描画 |
| PreviewService | AppStateStore | Service -> Store | プレビュー対象取得 |
| VideoExportService | VideoRenderEngine | Service -> Domain | 動画生成 |
| VideoExportService | DownloadManager | Service -> Utility | ダウンロード準備 |
| VideoExportService | AppStateStore | Service -> Store | 出力状態保持 |
| ManifestBootstrapService | AssetManifestResolver | Service -> Domain | 初期マニフェスト読込 |
| ManifestBootstrapService | AppStateStore | Service -> Store | 利用可能アセット反映 |

## Communication Patterns

- **UI -> Service**: ユーザー操作イベントをサービスに渡す
- **Service -> Domain/Adapter**: 検証・解決・外部通信を抽象化
- **Service -> Store**: 単一状態源へ反映しUI再描画を駆動
- **Service -> UI Renderer**: プレビュー/描画は明示コマンドで実行

## Data Flow

1. テーマ入力 -> 生成API -> YAML格納
2. YAML編集 -> バリデーション -> エラー/シーン反映
3. シーン選択 -> アセット解決 -> プレビュー描画
4. エクスポート開始 -> シーン列レンダリング -> WebM Blob生成 -> ダウンロード

## Boundary Rules

- ScriptGenerationClient は外部API通信のみ担当し、業務判定を持たない
- ScriptValidationEngine は純粋検証ロジックを優先し、PBT対象に適する構造とする
- VideoRenderEngine は描画・録画処理に専念し、UI状態は扱わない
