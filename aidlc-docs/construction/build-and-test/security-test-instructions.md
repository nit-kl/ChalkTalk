# Security Test Instructions

## Purpose
Security Baseline に基づき、入力検証・秘密情報保護・依存関係脆弱性を確認する。

## Security Checks

### 1. Dependency Vulnerability Scan
```bash
cd apps/web && npm audit
cd ../api && npm audit
```

### 2. Input Validation Tests
```bash
cd apps/api && npm run test
```
- 空入力/長すぎる入力/不正localeで400が返ることを確認

### 3. Error Information Leakage Tests
- provider/internalエラー時に内部スタックや秘密情報がレスポンスへ露出しないことを確認
- `category/code/message/requestId` 形式に統一されることを確認

### 4. Secrets Handling Checks
- `CLAUDE_API_KEY` が `.dev.vars` / Workers Secrets でのみ扱われることを確認
- Git追跡対象に秘密情報が含まれないことを確認
