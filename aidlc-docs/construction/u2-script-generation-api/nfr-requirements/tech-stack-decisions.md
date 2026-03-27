# Tech Stack Decisions - u2-script-generation-api

## Runtime
- **Choice**: Cloudflare Workers (TypeScript)
- **Rationale**: 企画書前提と整合し、低運用コストでAPI提供可能

## Provider Integration
- **Choice**: Claude API (Haiku)
- **Rationale**: 日本語生成品質とコストのバランス

## Input Validation
- **Choice**: スキーマベース検証 + 追加業務ルール
- **Rationale**: 不正入力の早期拒否と一貫性向上

## Rate Limiting
- **Choice**: IP/Clientキー単位制限（Workersで判定）
- **Rationale**: APIコスト急増リスクの抑制

## Error Envelope
- **Choice**: 固定カテゴリとエラーコード体系
- **Rationale**: U1への連携安定化と運用追跡性向上

## Logging & Monitoring
- **Choice**: 構造化ログ + 主要メトリクス（遅延、失敗率、429率）
- **Rationale**: 障害検知と改善サイクル短縮

## Testing Strategy
- **Choice**:
  - 例ベーステスト: 入力検証・制限判定・応答整形
  - PBT: エラー分類変換、正規化関数の性質検証
- **Rationale**: 既知ケースと未知ケースの両方を担保
