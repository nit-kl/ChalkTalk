# Unit of Work Story Map

## Story to Unit Mapping

| Story ID | Story Summary | Assigned Unit | Rationale |
|---|---|---|---|
| US-01 | テーマ入力開始 | U1 Frontend Experience | 入力UIと状態管理の責務 |
| US-02 | AIでYAML生成 | U2 Script Generation API | API通信、エラー、レート制限 |
| US-03 | YAML編集 | U1 Frontend Experience | エディタ体験 |
| US-04 | YAML妥当性検証 | U1 Frontend Experience | UI検証表示中心（検証連携） |
| US-05 | シーンプレビュー | U1 Frontend Experience | プレビューUXの中心 |
| US-06 | WebM動画生成 | U3 Rendering & Export | レンダリング/録画責務 |
| US-07 | WebMダウンロード | U3 Rendering & Export | 出力ファイル導線 |
| US-08 | マニフェスト経由解決 | U4 Asset & Manifest | アセット解決の専任責務 |
| SEC-01 | API入力バリデーション | U5 Cross-Cutting Quality | 横断的セキュリティ制約 |
| SEC-02 | セキュリティログ方針 | U5 Cross-Cutting Quality | 横断的監査要件 |
| PBT-01 | YAML往復特性テスト | U5 Cross-Cutting Quality | 横断テスト基盤 |
| PBT-02 | シーン変換不変条件テスト | U5 Cross-Cutting Quality | 横断テスト基盤 |

## Coverage Validation

- 全ストーリーが少なくとも1つのUnitに割り当て済み
- MVP主経路（US-01 -> US-07）はU1/U2/U3/U4で網羅
- 横断品質要件（SEC/PBT）はU5で一元管理

## Sequencing for MVP Demo

1. U1で入力・編集・プレビューの土台を作る
2. U2で台本生成APIを統合し、入力から生成まで通す
3. U4でアセット解決を確実化しプレビューの再現性を上げる
4. U3でWebM生成とダウンロードを完成させる
5. U5でSEC/PBT要件を横断チェックして品質を閉じる
