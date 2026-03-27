# Deployment Architecture - u1-frontend-experience

## Deployment Topology

1. `apps/web` をビルドし Cloudflare Pages へデプロイ
2. U1は Pages 上の静的フロントとして配信
3. U1が必要とするAPI呼び出しは Workers エンドポイントへ送信（U2領域）
4. U1のプレビュー描画はブラウザ内で実行
5. アセット参照はR2配信パスを利用（U4領域）

## Runtime Flow

- Browser
  - UI入力/編集/検証/プレビューを処理
  - 生成要求時のみWorkers APIを呼び出し
  - アセットをR2経由で取得
- Edge/CDN
  - ページと静的アセットをキャッシュ配信
- API Boundary
  - Workers経由でAI生成処理へ接続

## Release Strategy

- ブランチベースのPreview Deploymentを有効化
- `main` マージ時に本番デプロイ
- 重大障害時は直前安定版へロールバック

## Operational Controls

- デプロイ前チェック:
  - フロントビルド成功
  - 型チェック/テスト成功
  - セキュリティヘッダ設定確認
- デプロイ後チェック:
  - 画面表示
  - テーマ入力とYAML編集
  - プレビュー表示
  - API接続ヘルス

## Risks and Mitigations

- **Risk**: API境界遅延によりUX悪化
  - **Mitigation**: 進捗表示、タイムアウト、再試行導線
- **Risk**: アセット取得失敗
  - **Mitigation**: フォールバック描画、警告表示、再取得導線
- **Risk**: ブラウザ差異による描画不一致
  - **Mitigation**: 対応ブラウザ方針と互換テストをBuild/Testで実施
