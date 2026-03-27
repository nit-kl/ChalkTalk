# Business Logic Model - u2-script-generation-api

## Goal
テーマ入力を安全に受理し、AI台本生成を実行して、UIが扱える標準レスポンスを返す。

## Core Workflow

1. リクエストを受信（theme, locale）
2. 入力検証（必須、長さ、許可文字）
3. レート制限判定
4. AIプロバイダへ生成要求
5. 生成結果をYAML形式で整形
6. 安全なレスポンス/エラーへ正規化して返却

## State Model

- `Received` -> `Validated` -> `RateChecked` -> `Generating` -> `Responded`
- エラー経路:
  - ValidationFail
  - RateLimitExceeded
  - ProviderFailure
  - InternalFailure

## Decision Points

- 入力不正なら即時400系応答
- レート超過なら429応答
- プロバイダ応答が不正なら安全な失敗応答
