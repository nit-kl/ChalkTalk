# Unit of Work Definitions

## Decomposition Decision

- **Selected strategy**: 5 Unit前後の細かめ分解（回答: Q1=A, Q5=A）
- **Execution priority rule**: 最短で動くデモ成立（回答: Q3=A）
- **Cross-cutting treatment**: SEC/PBTは独立のU5で管理（回答: Q4=A）

## Code Organization Strategy (Greenfield)

- **Repository model**: Monorepo（回答: Q2=A）
- **Proposed structure**:
  - `apps/web` - フロントエンドUI、編集、プレビュー
  - `apps/api` - Workers API（台本生成、レート制限、入力検証）
  - `packages/shared` - 共有型、スキーマ、バリデーションモデル、共通ユーティリティ
  - `packages/testing` - PBTジェネレータ、共通テストヘルパー

## Units

## U1 Frontend Experience Unit
- **Purpose**: ユーザー操作の主経路（入力→編集→プレビュー）を成立させる
- **Primary Scope**:
  - ThemeInputPanel
  - YamlEditorPanel
  - ScenePreviewCanvas
  - AppStateStore（UI側状態）
- **Outcome**:
  - テーマ入力とYAML編集が可能
  - バリデーション結果表示とシーンプレビューが機能

## U2 Script Generation API Unit
- **Purpose**: AI台本生成API連携の信頼性確保
- **Primary Scope**:
  - ScriptGenerationClient
  - ScriptGenerationService
  - Workers API adapter
  - レート制限/エラーマッピング
- **Outcome**:
  - テーマからYAMLを取得
  - API失敗時の再試行可能なUXを提供

## U3 Rendering & Export Unit
- **Purpose**: 動画生成とダウンロードを成立させる
- **Primary Scope**:
  - VideoRenderEngine
  - VideoExportService
  - DownloadManager
- **Outcome**:
  - シーン列からWebM生成
  - ダウンロード導線の提供

## U4 Asset & Manifest Unit
- **Purpose**: アセット解決の一貫性保証
- **Primary Scope**:
  - AssetManifestResolver
  - ManifestBootstrapService
  - R2アセット参照整備
- **Outcome**:
  - 背景/表情キー解決
  - 未定義キー検知と安全なフォールバック

## U5 Cross-Cutting Quality Unit
- **Purpose**: セキュリティ要件とPBT要件を横断的に実装方針へ反映
- **Primary Scope**:
  - 入力検証方針
  - ログ方針（機密除外、構造化）
  - PBT対象とテスト資産
- **Outcome**:
  - SECURITY/PBT拡張の設計準拠
  - 後続CONSTRUCTIONでの品質ゲート明確化

## Recommended Execution Sequence

1. U1 Frontend Experience Unit
2. U2 Script Generation API Unit
3. U4 Asset & Manifest Unit
4. U3 Rendering & Export Unit
5. U5 Cross-Cutting Quality Unit

## Boundary Validation Summary

- 各Unitは主要責務で重複が少ない
- U5を横断Unitとして分離し、実装Unitの責務肥大化を防止
- ストーリー終点（WebMダウンロード）に向けた順序整合性を確認
