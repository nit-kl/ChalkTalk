# Unit of Work Dependency Matrix

## Dependency Matrix

| From Unit | Depends On | Dependency Type | Reason |
|---|---|---|---|
| U2 Script Generation API | U1 Frontend Experience | Contract | 生成トリガーと結果反映のUI契約 |
| U4 Asset & Manifest | U1 Frontend Experience | Runtime | プレビューに必要なアセット解決 |
| U3 Rendering & Export | U1 Frontend Experience | Runtime | 検証済みシーンデータ入力 |
| U3 Rendering & Export | U4 Asset & Manifest | Runtime | 背景/立ち絵の実体参照 |
| U5 Cross-Cutting Quality | U1/U2/U3/U4 | Cross-cutting | 各UnitへSEC/PBT適用 |

## Execution Constraints

- U1は最初に着手可能（単独で最小UIを成立できる）
- U2はU1と並行可能だが、統合確認はU1の入力契約後
- U4はU1と並行可能、U3の前に最低限のキー解決を完了
- U3はU1+U4が準備できてから本格着手
- U5は全Unitへ順次適用、最終的に横断確認

## Critical Path

U1 -> (U2, U4) -> U3 -> U5

## Integration Checkpoints

1. **Checkpoint A**: U1 + U2
   - テーマ入力からYAML反映まで通ること
2. **Checkpoint B**: U1 + U4
   - プレビューでアセット解決が成立すること
3. **Checkpoint C**: U1 + U4 + U3
   - WebM出力とダウンロードが成立すること
4. **Checkpoint D**: All + U5
   - SECURITY/PBT要件に沿った設計・テスト方針確認
