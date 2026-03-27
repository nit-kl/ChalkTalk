# NFR Requirements - u2-script-generation-api

## 1. Scalability

- レート制限を前提に、急激なトラフィック増加時でもAPI枯渇を防ぐ
- 将来的なBYOKやキャッシュ導入を阻害しない設計にする

## 2. Performance

- 入力検証と制限判定は低遅延で実行する
- プロバイダ呼び出しはタイムアウトを設け、無限待機を避ける
- 失敗応答も一貫した速度で返す

## 3. Availability & Resilience

- プロバイダ障害時は安全なエラー応答を返し、API全体停止を回避
- 一時障害に対して限定リトライを行う
- 障害時でも再試行可能な応答形式を維持

## 4. Security

- 入力値は必ず検証してから外部送信
- エラーメッセージに内部情報や秘密情報を含めない
- HTTPSのみで通信
- Security Baseline適用前提で実装する

## 5. Reliability

- エラー分類を固定（validation/rate_limit/provider/internal）
- requestIdで追跡可能にする
- レート制限判定結果を安定して返却

## 6. Maintainability

- プロバイダ呼び出しと業務ルールを分離
- エラー正規化を共通化しU1/U2で再利用可能にする
- 設定値（閾値、タイムアウト）は外部化する

## 7. Operability & Observability

- 主要イベント（受信、制限超過、プロバイダ失敗）を計測
- 機密を含まない構造化ログを出力
- 失敗率/429率/遅延を監視対象に含める

## 8. Compliance Notes

- **Security Baseline**: 適用対象（入力検証、ログ、安全な応答）
- **Property-Based Testing**: 適用対象（エラー分類・変換境界の性質検証）
