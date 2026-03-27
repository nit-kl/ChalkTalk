# Deployment Architecture - u2-script-generation-api

## Deployment Topology

1. `apps/api` をビルドして Cloudflare Workers へデプロイ
2. U2は `/api/script/generate` を提供
3. U1（Pages）から U2 Worker を HTTPS で呼び出し
4. U2は Claude API と通信してYAML台本を生成
5. 応答は標準エンベロープ（success/error + requestId）で返却

## Runtime Flow

- Client Boundary (U1)
  - テーマ入力を送信
  - requestId付き応答を受領してUI更新
- API Edge (U2 Worker)
  - 入力検証 -> 制限判定 -> 生成実行 -> 応答正規化
- Provider Boundary
  - Claude API 呼び出し（タイムアウト/限定リトライ）

## Release Strategy

- ブランチ単位で staging Worker へ先行反映
- `main` マージで prod Worker へデプロイ
- 障害時は直前安定版へロールバック

## Operational Controls

- デプロイ前チェック:
  - 型チェック/ユニットテスト/PBTの成功
  - Secrets と環境変数の存在確認
  - レート制限設定値の妥当性確認
- デプロイ後チェック:
  - ヘルス確認（200/400/429系の期待応答）
  - タイムアウト時の provider エラー応答確認
  - ログとメトリクス出力確認

## Risks and Mitigations

- **Risk**: Claude API遅延で応答悪化
  - **Mitigation**: 厳格なタイムアウト、限定リトライ、失敗時の即時正規化
- **Risk**: レート制限の誤設定
  - **Mitigation**: 環境別設定、デプロイ前検証、429率監視
- **Risk**: エラー情報の過剰露出
  - **Mitigation**: Safe Error Surface徹底、内部例外のマスキング
