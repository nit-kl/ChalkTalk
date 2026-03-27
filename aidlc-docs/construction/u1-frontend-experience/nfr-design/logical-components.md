# Logical Components - u1-frontend-experience NFR Design

## LC-01 InputGuard
- **Role**: テーマ入力の制約適用（必須・長さ・表示サニタイズ）
- **Supports**: Security, Usability, Reliability
- **Interfaces**:
  - `validateTheme(theme): GuardResult`
  - `sanitizeTheme(theme): string`

## LC-02 ValidationOrchestrator
- **Role**: 軽量検証と重検証の実行制御
- **Supports**: Performance, Maintainability
- **Interfaces**:
  - `runFastChecks(yaml): ValidationReport`
  - `runDeepChecks(yaml): ValidationReport`

## LC-03 StateTransitionController
- **Role**: UI状態遷移の単一制御点
- **Supports**: Reliability
- **Interfaces**:
  - `transition(currentState, event): NextState`
  - `canSubmitGenerate(state): boolean`

## LC-04 PreviewRenderCoordinator
- **Role**: シーン単位再描画と失敗時フォールバック制御
- **Supports**: Performance, Availability
- **Interfaces**:
  - `renderScene(sceneVm): RenderResult`
  - `renderFallback(reason): void`

## LC-05 ErrorEnvelopeMapper
- **Role**: 内部エラーを安全なUIエラーへ正規化
- **Supports**: Security, Usability
- **Interfaces**:
  - `toUiError(err): UiError`
  - `toTelemetryEvent(err): TelemetryEvent`

## LC-06 SnapshotStore
- **Role**: Last-Known-Goodデータ保持
- **Supports**: Reliability, Recovery
- **Interfaces**:
  - `saveValidSnapshot(snapshot): void`
  - `getValidSnapshot(): Snapshot`

## LC-07 TelemetryFacade
- **Role**: 機密を除外した計測イベント出力
- **Supports**: Observability, Security
- **Interfaces**:
  - `track(eventName, payload): void`
  - `trackError(category, code): void`

## Interaction Outline

1. InputGuard が入力受理条件を判定
2. ValidationOrchestrator が検証を実行
3. StateTransitionController が状態遷移を決定
4. PreviewRenderCoordinator が局所再描画
5. ErrorEnvelopeMapper と TelemetryFacade が失敗情報を安全に処理
6. SnapshotStore が復帰可能な表示状態を維持
