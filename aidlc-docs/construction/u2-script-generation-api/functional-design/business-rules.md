# Business Rules - u2-script-generation-api

## Input Rules

1. `theme` は必須
2. `theme` の最大長を制限
3. 不正文字列は拒否または正規化
4. `locale` は許可値のみ受理

## Rate Limiting Rules

1. IP単位またはクライアント識別子単位で制限
2. 閾値超過時は429と再試行目安を返す
3. 制限判定は生成処理前に実施

## Provider Invocation Rules

1. タイムアウトを設定
2. 一時障害時は限定的リトライ
3. 応答フォーマット検証（YAML最小要件）

## Error Handling Rules

1. 内部例外詳細はクライアントに返さない
2. エラー分類は `validation/rate_limit/provider/internal` を維持
3. ログは機密を含めない

## Security/Quality Rules

1. すべてHTTPS前提
2. 入力は必ず検証してからプロバイダへ渡す
3. レート制限イベントを監査対象に含める
