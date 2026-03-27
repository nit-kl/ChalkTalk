# NFR Design Patterns - u2-script-generation-api

## 1. Scalability Patterns

### SCL-1: Rate-Limited Admission Control
- **Intent**: コスト急増と過負荷を防ぐ
- **Application**:
  - 生成処理前にレート制限判定
  - 閾値超過時は即時429
- **Effect**: 高負荷時でも安定動作

### SCL-2: Config-Driven Limits
- **Intent**: 環境ごとに閾値を調整可能にする
- **Application**:
  - 閾値/ウィンドウを設定外部化
- **Effect**: 運用時の柔軟な調整

## 2. Performance Patterns

### PERF-1: Fast-Fail Validation
- **Intent**: 不正入力を早期に除外
- **Application**:
  - 入力検証に失敗したら外部呼び出しせず応答
- **Effect**: 無駄な呼び出し削減

### PERF-2: Time-Bounded Provider Call
- **Intent**: 応答遅延の上限を制御
- **Application**:
  - タイムアウト付き呼び出し
  - 一時障害のみ限定リトライ
- **Effect**: ハング防止と平均応答改善

## 3. Availability/Resilience Patterns

### RES-1: Error Envelope Normalization
- **Intent**: 障害時も一貫した応答契約を維持
- **Application**:
  - validation/rate_limit/provider/internal へ分類
- **Effect**: クライアント側復帰処理を単純化

### RES-2: Retry with Guardrails
- **Intent**: 一時障害への耐性を上げる
- **Application**:
  - リトライ回数を固定上限化
  - 恒久障害は即失敗
- **Effect**: 失敗連鎖の抑止

## 4. Security Patterns

### SEC-1: Strict Input Boundary
- **Intent**: 不正入力の外部伝播防止
- **Application**:
  - スキーマ検証 + 業務ルール検証
- **Effect**: 攻撃面縮小

### SEC-2: Safe Error Surface
- **Intent**: 内部情報漏えい防止
- **Application**:
  - 内部例外の詳細隠蔽
  - requestIdで追跡可能にする
- **Effect**: セキュアな障害対応

## 5. Observability Patterns

### OBS-1: Structured Event Logging
- **Intent**: 障害分析を容易にする
- **Application**:
  - 受信/制限超過/生成失敗/成功を構造化ログで記録
- **Effect**: 原因特定時間の短縮

### OBS-2: KPI-Centric Metrics
- **Intent**: 品質監視を定量化
- **Application**:
  - 失敗率、429率、レイテンシを計測
- **Effect**: 継続改善の基盤
