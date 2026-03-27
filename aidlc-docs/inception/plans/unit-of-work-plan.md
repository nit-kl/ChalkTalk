# Unit of Work Plan

## 1. 計画チェックリスト（Part 1: Planning）
- [x] 要件・ストーリー・アプリ設計を読み込み、分解対象を整理
- [x] Unit候補と責務境界の初期案を作成
- [x] ユーザー回答を回収し、全 `[Answer]:` が埋まっていることを確認
- [x] 回答の曖昧さ/矛盾を分析し、必要なら追質問を追加（今回は追質問なし）
- [ ] 分解方針を確定して承認を取得

## 2. 必須成果物（Part 2で生成）
- [ ] `aidlc-docs/inception/application-design/unit-of-work.md`
- [ ] `aidlc-docs/inception/application-design/unit-of-work-dependency.md`
- [ ] `aidlc-docs/inception/application-design/unit-of-work-story-map.md`
- [ ] Greenfield向けコード構成戦略の明文化（`unit-of-work.md` 内）
- [ ] Unit境界と依存の妥当性検証
- [ ] 全ストーリーのUnit割当確認

## 3. 初期分解案（たたき台）
- **U1 Frontend Experience Unit**: テーマ入力、YAML編集、バリデーション表示、プレビューUI
- **U2 Script Generation API Unit**: Workers経由の台本生成API連携、エラーハンドリング、レート制限
- **U3 Rendering & Export Unit**: シーンレンダリング、MediaRecorder、WebM出力、ダウンロード
- **U4 Asset & Manifest Unit**: R2配信アセット、マニフェスト解決、未定義キー検知
- **U5 Cross-Cutting Quality Unit**: セキュリティ要件（入力検証/ログ）とPBT対象テスト方針

## 4. 質問（回答必須）
以下の質問に回答してください。`[Answer]:` に選択肢を記入し、`X) Other` の場合は具体内容も書いてください。

## Question 1
Unit分解の基本方針はどれが良いですか？

A) 上記初期案（U1〜U5）で進める
B) Frontend/API/Renderingの3 Unitに集約する
C) FrontendとBackendの2 Unitに最小化する
X) Other（その他）

[Answer]:A

## Question 2
Greenfieldのコード構成として、MVP初期はどれを優先しますか？

A) 単一リポジトリ（apps/web + apps/api + shared）
B) 単一アプリ構成（まずweb中心、apiは同一管理）
C) 将来分離前提で最初からサービス別ディレクトリ
X) Other（その他）

[Answer]:A

## Question 3
Unit実行順の優先基準はどれが良いですか？

A) 最短で動くデモ成立（UI→生成→出力）
B) 技術リスク先行解消（生成API/レンダリング先行）
C) 依存の少ない順で並列化しやすくする
X) Other（その他）

[Answer]:A

## Question 4
SEC/PBTをどのUnitに割り当てますか？

A) U5として独立管理（横断Unit）
B) 各機能Unitに埋め込み、独立Unitは作らない
C) ハイブリッド（主要は埋め込み、共通ルールはU5）
X) Other（その他）

[Answer]:A

## Question 5
Unit粒度はどれを希望しますか？

A) 5 Unit前後（細かめ）
B) 3-4 Unit（標準）
C) 2 Unit（粗め）
X) Other（その他）

[Answer]:A
