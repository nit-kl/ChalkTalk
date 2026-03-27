# Unit Test Execution

## Run Unit Tests

### 1. Execute All Unit Tests
```bash
cd apps/web && npm run test
cd ../api && npm run test
```

### 2. Review Test Results
- **Expected**: 合計 14 tests pass, 0 failures
  - Web: 5 tests
  - API: 9 tests
- **Test Coverage**: 現時点は閾値未設定（将来導入）
- **Test Report Location**: 標準出力（Vitest）

### 3. Fix Failing Tests
If tests fail:
1. 失敗テストのメッセージを確認
2. 対象コードまたはテストデータを修正
3. `npm run test` を再実行して全件成功まで繰り返す
