# Infrastructure Design - u1-frontend-experience

## 1. Service Mapping

| Logical Component | Infrastructure Service | Mapping Rationale |
|---|---|---|
| AppShell / UI Components | Cloudflare Pages + CDN | 静的配信と高速キャッシュを提供 |
| InputGuard / ValidationOrchestrator | Browser Runtime (Web App) | クライアント側で低遅延検証を実現 |
| PreviewRenderCoordinator / SceneCanvas | Browser Canvas Runtime | U1要件の局所再描画に適合 |
| ErrorEnvelopeMapper | Web App Error Layer | 安全なUIエラー表現を統一 |
| TelemetryFacade | Cloudflare Analytics + app event endpoint | 機密除外の計測連携 |
| ScriptGeneration integration entry | Cloudflare Workers API endpoint | U2への境界接続点 |
| Asset fetch path | Cloudflare R2 public/managed access path | 背景・立ち絵の配信源 |

## 2. Infrastructure Concerns

### Networking
- フロントエンド公開はCloudflare Pagesドメインを使用
- APIはWorkersエンドポイントへHTTPSで接続
- CORSは許可オリジンをPagesドメインに限定

### Security
- すべてHTTPS前提
- フロント配信ヘッダでCSP/HSTS等を適用（詳細は実装時に確定）
- クライアントログは機密値を除外

### Availability
- CDN配信で静的資産可用性を確保
- API障害時はU1で再試行導線を提供
- アセット欠損時はフォールバック描画を維持

### Performance
- 静的アセットをCDNキャッシュ
- プレビュー関連計算はクライアント内で完結
- 検証処理は軽量優先 + デバウンス設計

### Observability
- フロント主要イベント（生成要求、検証失敗、描画失敗）を計測
- エラーコードベースの集計を可能にする

## 3. Environment Separation

- **dev**: 開発ビルド + 開発用APIエンドポイント
- **staging**: 本番相当設定でUAT
- **prod**: 本番配信（キャッシュ・セキュリティヘッダ適用）

## 4. Shared Infrastructure Notes

- shared-infrastructure.md は現時点では未作成（U1専用設計）
- 共有化対象（将来）:
  - 共通監視イベントスキーマ
  - 共通エラーコード体系
