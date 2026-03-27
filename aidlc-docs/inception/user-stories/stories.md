# User Stories (MVP)

## ストーリー分解方針

- **Approach**: User Journey-Based
- **Granularity**: 1ストーリー=1ユーザー価値（細かめ）
- **Priority Rule**: 早期リリース可能性（最短MVP成立）を最優先
- **Acceptance Criteria Format**: 箇条書きチェックリスト
- **Persona Scope**: P-01 YouTube初心者
- **MVP成功終点**: テーマ入力からWebMダウンロード完了

## MVPユーザージャーニー

1. テーマを入力する
2. AIでYAML台本を生成する
3. YAMLを編集し検証する
4. シーンをプレビューする
5. 動画を生成する
6. WebMをダウンロードする

---

## US-01 テーマ入力を開始できる

- **As a** YouTube初心者
- **I want** 解説したいテーマを入力できる
- **So that** 台本生成をすぐ開始できる
- **Persona**: P-01
- **Priority**: P0

### Acceptance Criteria
- [ ] テーマ入力欄が表示される
- [ ] 空入力では生成開始できず、理由が表示される
- [ ] 入力上限文字数が定義され、超過時にエラー表示される

## US-02 AIでYAML台本を生成できる

- **As a** YouTube初心者
- **I want** 入力テーマからYAML台本を生成したい
- **So that** 手作業でゼロから台本を書く負担を減らせる
- **Persona**: P-01
- **Priority**: P0

### Acceptance Criteria
- [ ] 生成API呼び出し中はローディング状態を表示する
- [ ] 生成成功時にYAMLがエディタへ反映される
- [ ] 生成失敗時に再試行可能なエラーメッセージを表示する
- [ ] レート制限超過時にユーザー向け説明を表示する

## US-03 生成YAMLを編集できる

- **As a** YouTube初心者
- **I want** 生成結果をYAMLで編集したい
- **So that** 内容を自分の意図に合わせて調整できる
- **Persona**: P-01
- **Priority**: P0

### Acceptance Criteria
- [ ] YAMLエディタで編集が可能である
- [ ] 保存前でも最新入力に対する検証結果が見える
- [ ] 構文エラー時は行単位で原因を特定できる表示がある

## US-04 YAML妥当性を検証できる

- **As a** YouTube初心者
- **I want** YAMLの誤りを事前に検知したい
- **So that** 生成・出力で失敗しない
- **Persona**: P-01
- **Priority**: P0

### Acceptance Criteria
- [ ] 必須項目（scene id/background/dialogue/duration 等）の欠落を検知する
- [ ] 型不正や未定義値（例: 未登録expression）を検知する
- [ ] エラーがない場合は「生成可能」状態になる

## US-05 シーンをプレビューできる

- **As a** YouTube初心者
- **I want** 編集結果の見た目を事前確認したい
- **So that** 出力前に違和感を修正できる
- **Persona**: P-01
- **Priority**: P1

### Acceptance Criteria
- [ ] 背景・立ち絵・黒板文字・字幕が重ね合わせ表示される
- [ ] シーン単位で表示切り替えできる
- [ ] アセット解決失敗時に代替表示と警告を出す

## US-06 WebM動画を生成できる

- **As a** YouTube初心者
- **I want** ブラウザ内で動画を生成したい
- **So that** 編集ソフトなしで公開素材を作れる
- **Persona**: P-01
- **Priority**: P0

### Acceptance Criteria
- [ ] Canvas合成結果をMediaRecorderで録画できる
- [ ] シーン順序とdurationに沿って動画化される
- [ ] 生成失敗時に原因カテゴリ（互換性/権限/処理失敗）を表示する

## US-07 WebMをダウンロードできる

- **As a** YouTube初心者
- **I want** 生成動画をローカル保存したい
- **So that** そのまま投稿作業へ進める
- **Persona**: P-01
- **Priority**: P0

### Acceptance Criteria
- [ ] 生成完了後にダウンロード操作が可能になる
- [ ] ファイル形式がWebMである
- [ ] 失敗時に再生成または再ダウンロード導線がある

## US-08 アセットをマニフェスト経由で解決できる

- **As a** YouTube初心者
- **I want** 表情や背景指定が正しく反映されてほしい
- **So that** 意図した画面構成で動画を作れる
- **Persona**: P-01
- **Priority**: P1

### Acceptance Criteria
- [ ] YAMLのbackground/expressionがマニフェストキーで解決される
- [ ] 未定義キーはエラーとして明示される
- [ ] 正常時はR2配信アセットが描画に利用される

---

## セキュリティストーリー群（独立管理）

### SEC-01 API入力バリデーションを徹底する
- **As a** サービス運営者
- **I want** すべてのAPI入力を検証したい
- **So that** 不正入力や想定外データで障害を起こさない
- **Priority**: P0

#### Acceptance Criteria
- [ ] リクエストスキーマ検証が導入される
- [ ] サイズ上限・形式検証・必須項目検証を実施する
- [ ] 失敗時は安全なエラー応答を返す

### SEC-02 セキュリティログ方針を定義する
- **As a** サービス運営者
- **I want** 監査可能なログを残したい
- **So that** 問題発生時に追跡できる
- **Priority**: P1

#### Acceptance Criteria
- [ ] 構造化ログ項目（timestamp, request id, level, message）が定義される
- [ ] 機密情報をログ出力しない方針が明文化される
- [ ] APIエラーとレート制限イベントが記録対象になる

---

## PBTストーリー群（主要変換ロジックを明示）

### PBT-01 YAMLパース/シリアライズの往復特性を検証する
- **As a** 開発チーム
- **I want** YAML変換の特性を網羅的に検証したい
- **So that** 例外的入力での破綻を減らせる
- **Priority**: P1

#### Acceptance Criteria
- [ ] `parse(serialize(x))` の往復特性をプロパティテストで検証する
- [ ] 生成器はシーン構造を満たすドメインデータを生成する
- [ ] 失敗時にseedと最小反例が再現できる

### PBT-02 シーン変換不変条件を検証する
- **As a** 開発チーム
- **I want** シーン変換ロジックの不変条件を検証したい
- **So that** 表示順・件数・duration整合の崩れを防げる
- **Priority**: P1

#### Acceptance Criteria
- [ ] 変換前後でシーン数・ID一意性などの不変条件を定義する
- [ ] 不変条件をプロパティテストで検証する
- [ ] 重要な反例は通常の回帰テストとして固定化する

---

## INVEST適合チェック

- **Independent**: 各ストーリーは単独価値で分離済み
- **Negotiable**: 実装方式は固定せず受け入れ基準で合意可能
- **Valuable**: ユーザー価値または運用品質価値に直結
- **Estimable**: 受け入れ基準により見積可能
- **Small**: MVPの反復実装に収まる粒度
- **Testable**: すべてチェックリスト形式の検証条件を保持
