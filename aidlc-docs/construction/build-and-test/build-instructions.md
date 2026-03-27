# Build Instructions

## Prerequisites
- **Build Tool**: Node.js 20.x, npm 11.x
- **Dependencies**:
  - `apps/web/package.json` の依存関係
  - `apps/api/package.json` の依存関係
- **Environment Variables**:
  - Web: `apps/web/.env.example` を参照
  - API: `apps/api/.dev.vars.example` を参照（`CLAUDE_API_KEY` など）
- **System Requirements**: Windows/macOS/Linux, 2GB+ RAM 推奨, 1GB+ 空き容量

## Build Steps

### 1. Install Dependencies
```bash
cd apps/web && npm install
cd ../api && npm install
```

### 2. Configure Environment
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

### 3. Build All Units
```bash
cd apps/web && npm run build
cd ../api && npm run build
```

### 4. Verify Build Success
- **Expected Output**:
  - Web: `vite build` 完了ログと `dist/` 生成
  - API: `tsc --noEmit` 成功
- **Build Artifacts**:
  - Web: `apps/web/dist/`
  - API: Typecheck成功（生成物なし）
- **Common Warnings**:
  - 依存関係の `EBADENGINE` 警告（Node patch差分）が出る場合あり

## Troubleshooting

### Build Fails with Dependency Errors
- **Cause**: `node_modules` 不整合、lock差分、npm optional dependencyの破損
- **Solution**:
  1. 該当アプリ配下で `node_modules` を削除
  2. `npm install` を再実行
  3. 再度 `npm run build`

### Build Fails with Compilation Errors
- **Cause**: 型定義不足、契約変更に対する未追従
- **Solution**:
  1. エラー箇所を修正
  2. `npm run typecheck`（api）/ `npm run build`（web）で再確認
