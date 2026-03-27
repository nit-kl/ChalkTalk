# NFR Design Patterns - u1-frontend-experience

## 1. Performance Patterns

### P1: Incremental Validation
- **Intent**: 大きいYAMLでも編集体験を維持する
- **Application**:
  - 編集イベントごとに軽量チェックを優先
  - 重い検証はデバウンス実行
- **Expected Effect**: 入力遅延の低減、体感応答性向上

### P2: Partial Preview Render
- **Intent**: シーン切替時の描画負荷を抑える
- **Application**:
  - 選択シーンのみ再描画
  - 変更がないレイヤーは再利用
- **Expected Effect**: プレビュー切替の高速化

## 2. Resilience Patterns

### R1: Error Classification and Recovery
- **Intent**: 失敗時でもユーザー操作を止めない
- **Application**:
  - `input` / `validation` / `api` / `render` のエラー分類
  - 各カテゴリごとの再試行導線を定義
- **Expected Effect**: 回復可能性の向上

### R2: Fail-Soft Preview
- **Intent**: アセット欠損や描画失敗時の可用性確保
- **Application**:
  - 代替表示（placeholder）を使用
  - 警告表示しつつ編集は継続
- **Expected Effect**: 作業中断の回避

## 3. Security Patterns

### S1: Output Sanitization Boundary
- **Intent**: 表示系XSS/注入リスクを抑止
- **Application**:
  - ユーザー入力は表示前にサニタイズ
  - 描画テキスト用に許可文字/長さ制約を適用
- **Expected Effect**: 不正表示・スクリプト混入の抑制

### S2: Safe Error Envelope
- **Intent**: 機密情報の漏えい防止
- **Application**:
  - 内部例外をUI表示向けエラーコードへ正規化
  - 原因詳細は内部ログに限定
- **Expected Effect**: 情報漏えいリスク低減

## 4. Reliability Patterns

### RL1: Deterministic UI State Machine
- **Intent**: 競合状態の発生を抑える
- **Application**:
  - 明示状態（Idle/Generating/Editing/Validating/PreviewReady/Error）
  - 生成中の多重リクエスト抑止
- **Expected Effect**: 不整合状態の減少

### RL2: Last-Known-Good Snapshot
- **Intent**: 検証失敗時の復帰性向上
- **Application**:
  - 直近有効なプレビュー入力を保持
  - 無効入力時はスナップショット維持
- **Expected Effect**: 安定した画面挙動

## 5. Maintainability Patterns

### M1: Pure Validation Core
- **Intent**: テスト容易性と再利用性の確保
- **Application**:
  - 検証ロジックを副作用なしの関数群へ分離
  - UI/IO依存を排除
- **Expected Effect**: 単体テスト/PBT適用容易化

### M2: ViewModel Translation Layer
- **Intent**: ドメインとUIの分離
- **Application**:
  - SceneデータをUI専用ViewModelへ変換
  - 表示仕様変更の影響を局所化
- **Expected Effect**: 変更容易性向上
