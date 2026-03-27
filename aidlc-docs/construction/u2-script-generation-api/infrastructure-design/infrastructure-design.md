# Infrastructure Design - u2-script-generation-api

## 1. Service Mapping

| Logical Component | Infrastructure Service | Mapping Rationale |
|---|---|---|
| RequestValidator | Cloudflare Workers Runtime | エッジで低遅延の入力検証を実現 |
| RateLimitGateway | Cloudflare Workers + KV (counter state) | 分散環境で制限判定を共有しやすい |
| ProviderInvoker | Cloudflare Workers outbound HTTPS | Claude API連携をサーバレスで実行 |
| ResponseNormalizer / ErrorClassifier | Workers application layer | 応答契約と分類規則を一元化 |
| TelemetryRecorder | Workers Logs + Analytics連携 | 構造化ログと主要指標の監視基盤 |
| ConfigProvider | Workers environment variables / secrets | 閾値・タイムアウト・API鍵を外部化 |

## 2. Infrastructure Concerns

### Networking
- 公開エンドポイントは Cloudflare Workers の HTTPS API
- フロント（Pages）からのアクセスを前提に CORS を制限
- Claude API への外向き通信は TLS 前提

### Security
- APIキーは Workers Secrets で管理
- 入力検証後のみ外部送信
- エラー応答は内部詳細を含まない固定エンベロープ

### Availability
- Workers のマルチPoP実行で単一点障害を回避
- プロバイダ一時障害に限定リトライ
- 失敗時も統一フォーマットで再試行可能な応答を返す

### Performance
- 検証と制限判定を生成前に実施して早期失敗
- プロバイダ呼び出しにタイムアウト上限を設定
- ログ送信は非同期優先で応答遅延を抑制

### Observability
- 主要イベント（受信、429、provider失敗、成功）を構造化記録
- 監視指標: p95遅延、失敗率、429率
- requestId でフロントとAPIログを相関可能にする

## 3. Environment Separation

- **dev**: 開発用Worker、緩い制限値、検証用プロバイダ設定
- **staging**: 本番相当の制限値と監視設定でUAT
- **prod**: 本番Worker、厳格な閾値、Secrets本番鍵

## 4. Shared Infrastructure Notes

- U1/U2で共有する基盤要素:
  - エラーコード体系と requestId 相関
  - 監視ダッシュボードの主要KPI（遅延/失敗率/429率）
- 将来拡張候補:
  - レート制限高度化（User単位/BYOK単位）
  - キャッシュ層導入（定型プロンプト最適化）
