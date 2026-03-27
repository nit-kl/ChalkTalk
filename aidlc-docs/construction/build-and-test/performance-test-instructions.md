# Performance Test Instructions

## Purpose
U2 API の応答時間・失敗率・429率を確認し、NFRで定義した性能要求の検証手順を提供する。

## Performance Requirements
- **Response Time**: p95 < 2000ms（通常負荷）
- **Throughput**: 10 req/s（開発環境目安）
- **Concurrent Users**: 10 concurrent requests
- **Error Rate**: < 1%（validation/rate_limitを除く）

## Setup Performance Test Environment

### 1. Prepare Test Environment
```bash
cd apps/api && npm run dev
```

### 2. Configure Test Parameters
- **Test Duration**: 3 minutes
- **Ramp-up Time**: 30 seconds
- **Virtual Users**: 10 users

## Run Performance Tests

### 1. Execute Load Tests
```bash
# 例: k6 run scripts/load/u2-generate-load.js
```

### 2. Execute Stress Tests
```bash
# 例: k6 run scripts/load/u2-generate-stress.js
```

### 3. Analyze Performance Results
- **Response Time**: p95が閾値内か確認
- **Throughput**: 目標req/s到達を確認
- **Error Rate**: provider/internalエラー率を確認
- **Bottlenecks**: provider応答遅延、レート制限設定、ネットワーク遅延
- **Results Location**: 負荷試験ツールの標準出力/レポート

## Performance Optimization

1. ボトルネック（provider timeout, retry設定）を特定
2. `PROVIDER_TIMEOUT_MS`, `PROVIDER_RETRY_MAX`, rate limit設定を調整
3. 再実行して改善を確認
