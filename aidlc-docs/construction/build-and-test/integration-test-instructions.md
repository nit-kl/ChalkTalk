# Integration Test Instructions

## Purpose
U1（web）とU2（api）の境界契約が、実運用フローで正しく連携することを確認する。

## Test Scenarios

### Scenario 1: U1 -> U2 Script Generation
- **Description**: テーマ入力からAPI生成応答までの統合確認
- **Setup**:
  - `apps/api/.dev.vars` を設定
  - APIをローカル起動
- **Test Steps**:
  1. `cd apps/api && npm run dev`
  2. 別ターミナルで `cd apps/web && npm run dev`
  3. Webでテーマを入力し生成を実行
- **Expected Results**:
  - U2が200で `success: true` を返す
  - U1側でYAMLが反映される
- **Cleanup**: 起動中プロセス停止

### Scenario 2: Validation / RateLimit Error Flow
- **Description**: 入力不正・連打時のエラー契約確認
- **Setup**: Scenario 1と同じ
- **Test Steps**:
  1. 空テーマでAPI呼び出し
  2. 短時間に閾値を超える連続呼び出し
- **Expected Results**:
  - 400: `category=validation`
  - 429: `category=rate_limit`, `retry-after` ヘッダ付与
- **Cleanup**: 必要に応じてAPI再起動（レート制限状態リセット）

## Setup Integration Test Environment

### 1. Start Required Services
```bash
cd apps/api && npm run dev
cd apps/web && npm run dev
```

### 2. Configure Service Endpoints
```bash
# web 側で API_BASE_URL を U2 のローカルURLへ向ける
# 例: VITE_SCRIPT_API_BASE_URL=http://127.0.0.1:8787
```

## Run Integration Tests

### 1. Execute Integration Test Suite
```bash
# 現時点は自動統合テスト未導入（手動シナリオ実行）
```

### 2. Verify Service Interactions
- **Test Scenarios**: U1->U2成功系、validationエラー、rate_limitエラー
- **Expected Results**: 仕様どおりのHTTPステータスとエラー分類
- **Logs Location**: API実行ターミナル（structured logs）

### 3. Cleanup
```bash
# dev server / worker を停止
```
