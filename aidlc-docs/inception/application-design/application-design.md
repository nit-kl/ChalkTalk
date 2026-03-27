# Application Design Summary

## Scope

本設計はMVP範囲（テーマ入力 -> YAML生成/編集 -> プレビュー -> WebM出力）を対象に、コンポーネント責務とサービス連携を定義する。

## Artifacts

- `components.md`: コンポーネント定義と責務
- `component-methods.md`: 主要メソッドシグネチャ
- `services.md`: サービス層とオーケストレーション
- `component-dependency.md`: 依存関係・通信パターン・データフロー

## Key Design Decisions

1. **責務分離**: 入力/UI、検証、アセット解決、描画、出力を分離
2. **サービス駆動**: UIから直接ドメイン/外部通信を呼ばず、サービス経由に統一
3. **状態一元化**: `AppStateStore` を中心に状態管理し、テスト容易性を高める
4. **NFR織り込み**: 入力検証、エラー分類、ログ方針、PBT対象を設計時点で明示

## Deferred to Functional Design

以下はCONSTRUCTIONのFunctional Designで詳細化する:
- YAMLスキーマの厳密仕様
- バリデーションルールの優先順位
- 描画パイプラインの詳細アルゴリズム
- エラーリカバリー分岐と境界条件
