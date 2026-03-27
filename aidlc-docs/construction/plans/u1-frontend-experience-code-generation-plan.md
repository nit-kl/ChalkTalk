# Code Generation Plan - u1-frontend-experience

この計画は `u1-frontend-experience` のコード生成における唯一の実行基準（single source of truth）です。

## Unit Context

- **Unit**: U1 Frontend Experience
- **Stories in Scope**:
  - US-01, US-03, US-04, US-05（US-02はU2依存、U1側の呼び出し境界のみ実装）
- **Dependencies**:
  - U2 Script Generation API（生成API呼び出し境界）
  - U4 Asset & Manifest（アセット解決境界）
- **Workspace Root Code Location**: `c:\Users\kojil\Documents\Dev\zunda-dev\ChalkTalk`
- **Application Code Path Policy**: `apps/web` 配下のみ（`aidlc-docs/` には実装コードを置かない）

## Planned File Targets (Application Code)

- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/vite.config.ts`
- `apps/web/src/main.tsx`
- `apps/web/src/App.tsx`
- `apps/web/src/styles.css`
- `apps/web/src/state/app-store.ts`
- `apps/web/src/domain/types.ts`
- `apps/web/src/domain/validation.ts`
- `apps/web/src/services/script-generation-client.ts`
- `apps/web/src/services/error-envelope.ts`
- `apps/web/src/services/preview-renderer.ts`
- `apps/web/src/components/ThemeInputSection.tsx`
- `apps/web/src/components/ScriptEditorSection.tsx`
- `apps/web/src/components/ValidationPanel.tsx`
- `apps/web/src/components/SceneNavigator.tsx`
- `apps/web/src/components/SceneCanvas.tsx`
- `apps/web/src/components/PreviewSection.tsx`
- `apps/web/src/components/StatusBanner.tsx`
- `apps/web/src/test/*.test.ts(x)`

## Numbered Execution Steps

- [ ] **Step 1: Project Structure Setup (greenfield)**
  - [ ] `apps/web` のVite+React+TypeScript基盤を作成
  - [ ] lint/test実行に必要な最小依存を追加

- [ ] **Step 2: Domain Model & Validation Core (US-04, PBT前提)**
  - [ ] `types.ts` に `ThemeInput`, `ValidationReport`, `SceneViewModel` などを定義
  - [ ] `validation.ts` に純粋関数のYAML検証境界を実装
  - [ ] 行番号付きエラー情報を返す構造を実装

- [ ] **Step 3: State Machine & Store (US-01/03/04/05)**
  - [ ] Zustandで `Idle/Generating/Editing/Validating/PreviewReady/Error` 状態遷移を実装
  - [ ] 重複生成要求抑止と再試行遷移を実装

- [ ] **Step 4: API Boundary Integration (US-01, US-02 bridge)**
  - [ ] `script-generation-client.ts` でWorkers API呼び出し境界を実装（モック可能）
  - [ ] `error-envelope.ts` で安全なUIエラー正規化を実装

- [ ] **Step 5: Frontend Components Generation (US-01/03/04/05)**
  - [ ] ThemeInput, Editor, Validation, Preview, Status系コンポーネントを実装
  - [ ] `data-testid` を全インタラクティブ要素へ付与
  - [ ] `App.tsx` でコンポーネント統合

- [ ] **Step 6: Preview Rendering Logic (US-05)**
  - [ ] `preview-renderer.ts` と `SceneCanvas` で局所再描画実装
  - [ ] 未解決アセット時のフォールバック表示を実装

- [ ] **Step 7: Unit Testing (US-01/03/04/05)**
  - [ ] validation純粋関数テスト
  - [ ] store状態遷移テスト
  - [ ] 主要コンポーネント描画・操作テスト

- [ ] **Step 8: Documentation Generation**
  - [ ] `aidlc-docs/construction/u1-frontend-experience/code/implementation-summary.md` を作成
  - [ ] 実装ファイル一覧、ストーリー対応、既知制約を記録

- [ ] **Step 9: Deployment Artifacts**
  - [ ] `apps/web` のビルド/起動スクリプトを整備
  - [ ] Pages配備前提の環境変数テンプレートを追加

- [ ] **Step 10: Traceability Completion**
  - [ ] US-01/03/04/05 の実装完了を計画内でチェック
  - [ ] U2/U4依存インターフェース境界の実装状況を記録

## N/A Steps (This Unit)

- [x] API Layer Generation (server-side business API) - N/A for U1
- [x] Repository Layer Generation - N/A for U1
- [x] Database Migration Scripts - N/A for U1
