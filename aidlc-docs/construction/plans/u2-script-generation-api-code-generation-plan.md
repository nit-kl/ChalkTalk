# Code Generation Plan - u2-script-generation-api

この計画は `u2-script-generation-api` のコード生成における唯一の実行基準（single source of truth）です。

## Unit Context

- **Unit**: U2 Script Generation API
- **Stories in Scope**:
  - US-02（AIでYAML生成）
  - U2責務としての API 境界、レート制限、エラー正規化
- **Dependencies**:
  - U1 Frontend Experience（リクエスト/レスポンス契約の呼び出し元）
  - Claude API（外部生成プロバイダ）
- **Expected Interfaces and Contracts**:
  - Endpoint: `POST /api/script/generate`
  - Request: `{ theme: string, locale: string }`
  - Success: `{ yaml: string, requestId: string, generatedAt: string }`
  - Error: `{ category, code, message, requestId }`
- **Database Entities**: なし（永続DB非依存）
- **Service Boundary**: 入力検証 -> 制限判定 -> プロバイダ呼び出し -> 応答正規化
- **Workspace Root Code Location**: `c:\Users\kojil\Documents\Dev\zunda-dev\ChalkTalk`
- **Application Code Path Policy**: `apps/api` 配下のみ（`aidlc-docs/` には実装コードを置かない）

## Planned File Targets (Application Code)

- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/wrangler.toml`
- `apps/api/src/index.ts`
- `apps/api/src/domain/types.ts`
- `apps/api/src/domain/validation.ts`
- `apps/api/src/domain/yaml-contract.ts`
- `apps/api/src/services/rate-limiter.ts`
- `apps/api/src/services/provider-client.ts`
- `apps/api/src/services/error-envelope.ts`
- `apps/api/src/services/script-service.ts`
- `apps/api/src/services/telemetry.ts`
- `apps/api/src/test/*.test.ts`
- `apps/api/.dev.vars.example`

## Numbered Execution Steps

- [ ] **Step 1: API Project Structure Setup (greenfield)**
  - [ ] `apps/api` の Cloudflare Workers + TypeScript 基盤を作成
  - [ ] 開発/ビルド/テストスクリプトを定義

- [ ] **Step 2: Domain Model & Validation Core (US-02, SEC-01)**
  - [ ] `types.ts` に Request/Response/Error/RateLimit の型を定義
  - [ ] `validation.ts` に theme/locale 検証ロジックを実装
  - [ ] `yaml-contract.ts` に YAML最小要件チェックを実装

- [ ] **Step 3: Rate Limiting Component (US-02, NFR-Scalability)**
  - [ ] `rate-limiter.ts` で判定インターフェースを実装
  - [ ] `allowed/remaining/retryAfterSec` を返す契約を固定

- [ ] **Step 4: Provider Invocation Component (US-02, NFR-Performance/Resilience)**
  - [ ] `provider-client.ts` で Claude API 呼び出し境界を実装
  - [ ] タイムアウトと限定リトライを実装

- [ ] **Step 5: Error Normalization & Classification (SEC-02, NFR-Reliability)**
  - [ ] `error-envelope.ts` で `validation/rate_limit/provider/internal` を正規化
  - [ ] 内部例外詳細をマスキングして安全応答に変換

- [ ] **Step 6: Script Service Orchestration (US-02)**
  - [ ] `script-service.ts` で検証 -> 制限 -> 生成 -> 正規化を統合
  - [ ] requestId 発行と generatedAt 付与を統一

- [ ] **Step 7: Worker API Layer Generation (US-02)**
  - [ ] `index.ts` に `POST /api/script/generate` ハンドラを実装
  - [ ] CORS/HTTPメソッド制御/JSON応答を実装

- [ ] **Step 8: Unit Testing & PBT Entry (PBT-01 関連境界)**
  - [ ] 検証・分類・正規化のユニットテストを作成
  - [ ] YAML要件チェックとエラー変換性質のテストを追加

- [ ] **Step 9: Documentation Generation**
  - [ ] `aidlc-docs/construction/u2-script-generation-api/code/implementation-summary.md` を作成
  - [ ] 実装ファイル一覧、US-02対応、既知制約を記録

- [ ] **Step 10: Deployment Artifacts & Traceability**
  - [ ] `wrangler.toml` と `.dev.vars.example` を整備
  - [ ] US-02 の完了と U1 契約接続点を計画内で [x] 化

## N/A Steps (This Unit)

- [ ] Frontend Components Generation - N/A for U2
- [ ] Repository Layer Generation - N/A（永続リポジトリなし）
- [ ] Database Migration Scripts - N/A（DBなし）
