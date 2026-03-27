# Logical Components - u2-script-generation-api NFR Design

## LC-01 RequestValidator
- **Role**: theme/localeの検証
- **Supports**: Security, Performance
- **Interfaces**:
  - `validateRequest(input): ValidationResult`

## LC-02 RateLimitGateway
- **Role**: 受理制御（判定と429応答）
- **Supports**: Scalability, Reliability
- **Interfaces**:
  - `checkLimit(key): RateLimitResult`
  - `buildRateLimitResponse(result): ErrorEnvelope`

## LC-03 ProviderInvoker
- **Role**: AIプロバイダ呼び出し（タイムアウト/リトライ）
- **Supports**: Performance, Availability
- **Interfaces**:
  - `invoke(prompt, options): ProviderResponse`

## LC-04 ResponseNormalizer
- **Role**: 成功/失敗レスポンスの標準化
- **Supports**: Reliability, Security
- **Interfaces**:
  - `toSuccessEnvelope(data): ApiEnvelope`
  - `toErrorEnvelope(error): ApiEnvelope`

## LC-05 ErrorClassifier
- **Role**: エラー分類の一元化
- **Supports**: Reliability, Maintainability
- **Interfaces**:
  - `classify(error): "validation" | "rate_limit" | "provider" | "internal"`

## LC-06 TelemetryRecorder
- **Role**: 構造化ログとメトリクス出力
- **Supports**: Operability, Observability
- **Interfaces**:
  - `recordEvent(name, payload): void`
  - `recordMetric(name, value): void`

## LC-07 ConfigProvider
- **Role**: 閾値、タイムアウト、モデル設定の外部化
- **Supports**: Maintainability, Scalability
- **Interfaces**:
  - `getRateLimitPolicy(): RateLimitPolicy`
  - `getProviderConfig(): ProviderConfig`

## Interaction Outline

1. RequestValidator が入力を検証
2. RateLimitGateway が受理可否を判定
3. ProviderInvoker が時間制限付きで生成実行
4. ErrorClassifier + ResponseNormalizer が応答契約を統一
5. TelemetryRecorder がイベント/メトリクスを記録
