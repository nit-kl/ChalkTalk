# Tech Stack Decisions - u1-frontend-experience

## Decision Summary

## UI Framework
- **Choice**: React + TypeScript
- **Rationale**: 既存方針との整合、状態分離しやすく型安全性が高い

## State Management
- **Choice**: Zustand
- **Rationale**: U1の状態遷移モデルに対して軽量で扱いやすい

## YAML Processing
- **Choice**: js-yaml（+ 独自バリデーション層）
- **Rationale**: YAML処理の定番ライブラリで、検証ロジックを分離しやすい

## Validation Strategy
- **Choice**: 構文検証 + スキーマ/ルール検証の2段階
- **Rationale**: エラー原因をユーザーに分かりやすく返すため

## Rendering
- **Choice**: Canvas API（プレビュー）
- **Rationale**: U3の動画レンダリング戦略と整合し、表示差異を減らせる

## Error Handling Pattern
- **Choice**: エラー分類（入力/検証/API/描画）してUI文言へ正規化
- **Rationale**: 機密情報露出を避けつつ再試行行動を促進

## Testing
- **Choice**:
  - 単体テスト: コンポーネント/状態遷移
  - PBT: YAML検証境界（後続で実装）
- **Rationale**: 例ベース＋性質ベースの補完で検証漏れを減らす

## Security Notes
- 表示前サニタイズ、エラー詳細抑制、入力制約の実装を必須とする
- Security Baselineの具体チェックは実装段階で検証する

## Deferred Decisions (to next stages)
- 詳細な監視SDK選定
- アクセシビリティ自動検証ツールの最終選定
- クライアント計測イベントの命名規約最終化
