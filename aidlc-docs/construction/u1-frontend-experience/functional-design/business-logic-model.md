# Business Logic Model - u1-frontend-experience

## Goal
ユーザーが「テーマ入力 -> YAML編集/検証 -> プレビュー確認」までを破綻なく反復できる状態遷移モデルを定義する。

## Core Workflow

1. ユーザーがテーマを入力する
2. 生成要求を送信し、YAML初期値を取得する（U2連携）
3. YAMLを編集する
4. 編集内容を検証し、結果を表示する
5. 検証OK時にプレビュー描画を更新する
6. 不正時はエラーを表示しつつ編集継続可能にする

## State Machine

- `Idle`:
  - 初期状態。テーマ入力待ち。
- `GeneratingScript`:
  - 生成要求実行中。完了で `Editing` へ、失敗で `Error` へ。
- `Editing`:
  - YAML編集中。変更のたびに `Validating` へ遷移。
- `Validating`:
  - 構文/スキーマ検証中。成功で `PreviewReady`、失敗で `ValidationError`。
- `ValidationError`:
  - エラー表示状態。編集継続で `Editing` に戻る。
- `PreviewReady`:
  - プレビュー表示可能。シーン切替や再編集が可能。
- `Error`:
  - 生成失敗/致命エラー状態。再試行で `GeneratingScript`。

## Decision Points

- テーマ入力が空または長すぎる場合、生成要求を拒否する
- YAMLが不正な場合、プレビュー更新を止める
- アセット解決失敗時、該当要素を代替表示し全体処理は継続する
