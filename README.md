# Movable Type テンプレート構築用テーマ

- VERSION：Moavable Type 7

初期構築のベーステーマ一式が同梱されています。<br>
構築に必要なものだけに特化したテーマ[Starterket theme]になります。

mt-theme-starterket-parentを[MT_HOME/themes/]へアップロードしてお使いください。

## [Theme] mt-theme-starterket-parent

CMS設計で考えられる基本のモジュールを同梱しています。

### File Organization

インストール後のモジュールについて

#### インデックステンプレート

* index.html

トップページで使用するインデックステンプレートになります。

* _format_template.html

新規テンプレート作成用のフォーマットファイル

#### コンテンツタイプテンプレート

* pages.html

固定ページ用のベーステンプレートになります。<br>
※基本ウェブページは、ウェブサイトにぶら下げることを推奨

#### モジュールテンプレート

* config：すべての設定・blogID・変数を記述したテンプレート
* component：SetVarTemplate、SetVarBlockを記述したテンプレート
* html_head：htmlのhead情報テンプレート
* html_foot：htmlのfoot情報テンプレート（scriptのインクルード等）
* header：表示側のheaderテンプレート
* footer：表示側のfooterテンプレート
* navigation：表示側のnavigationテンプレート
* script：scriptを記述したテンプレート（local_scriptはページ固有で使用）
* style：styleを記述したテンプレート（local_styleはページ固有で使用）
* debug：debug用のモジュール：初期値false（config内の `debug=true` で使用）

```
<mt:Include module="モジュール名" parent="1" />
```

## Base mt:ContentType

- 固定ページ

ベースのコンテンツタイプは固定ページのみをセットしてます。<br>
設計要件に応じて削除もしくは拡張します。

## Base mt:ContentField

- ページタイトル
- フォルダ
- ページ本文

固定ページで使用するベースのコンテンツフィールドになります。<br>
設計要件に応じて削除もしくは拡張します。

## Base CategorySet

- FolderGroup
- CategoryGroup

ベースのカテゴリセットになります。<br>
固定ページではFolderGroupを使用します。<br>
設計要件に応じて削除もしくは拡張します。

## Format

追加テンプレート用のフォーマットになります。

```
<mt:Ignore>
========================================
Template Name : テンプレートの名前
Template Type : 用途（Layout・Module・Script・Web Page・Entries・Entry・Category・ContentType） / （WebSite or Blog）
Template Note : テンプレートに対してのコメント
========================================
</mt:Ignore>
<mt:Include module="config" parent="1" />
<mt:Ignore>** ローカル変数 **</mt:Ignore>
<mt:Ignore>
<mt:SetVars>
// そのテンプレート固有で使いたい変数を格納してください。
</mt:SetVars>
</mt:Ignore>

<mt:Ignore>** 表示部分 **</mt:Ignore>
<mt:Unless name="compress" regex_replace="/^\s*\n/gm","">

// コンテンツを入れてください。

</mt:Unless>
```

* Template Name Type Note（第三者がテンプレートを閲覧した時に把握するために記述）
* ローカル変数（テンプレート固有にmt:Varしたいケースの時に記述）
* 表示部分（出力される部分を記述）

## Tips

### componentの使い方

componentは汎用的なもの（ボタンや見出し等）をSetVarTemplateやSetVarBlockを用いてテンプレート化して自由に出力先でmt:Varできるような形を想定したテンプレートになります。

#### 例：ボタン

```
<a class="クラス名が入ります。" href="URLが入ります。">ボタン名</a>
```

このようなボタンの場合、SetVarTemplateで入れる引数は3つ想定されます。

* hrefの値
* class名（サイズだったり、色だったりを定義したclass）
* ボタン名

##### MTML

```
<mt:Ignore>** Button Component：Set **</mt:Ignore>
<mt:SetVarTemplate name="_base_button" key="button" note="ボタン">
<a class="<mt:Var name="_button_class" />" href="<mt:Var name="_button_link" />">
  <mt:Var name="_button_name" />
</a>
</mt:SetVarTemplate>
```

```
<mt:Ignore>** Button Component：Build **</mt:Ignore>
<mt:Var name="_base_button" key="button" _button_class="button" _button_link="/path/" _button_name="ベースボタン" note="_base_buttonを実行" />
```

##### HTML出力結果

```
<a class="button" href="/path/">ベースボタン</a>
```

* コンポーネントする大きさや引数の取得数は、各自のルール（MTMLルール）の設定で行う
* mt:EntryBodyやmt:PageBody内でもmt:Var（Componentしたデータ）を出力するケースを考えmteval="1"の設定を推奨
* ※私個人としての判断としては引数の数は最大3つまでが推奨（それ以上になると見通しが悪くなるため）

## テンプレート命名規則

### PCとSP 別々のページ構成の場合

* 接頭辞をつけること

```
例：
pc_header
sp_header
```

## Debug Mode

`config` モジュールの `debug=true` でテストモジュールで値の出力チェックが可能です。<br>
初期値はfalseです。<br>
入力は `debug` モジュールにテストコードを記述します。

## Basic Workflow（プロジェクトのワークフローについて）

### MT構築ワークフロー

要件定義や仕様で変化する可能性はあります。基本のワークフローとして採用しています。

* 静的コーディング（HTMLテンプレートエンジン）を行う
* HTMLテンプレートエンジンでレイアウト分割する
* コーディングチェック・ブラウザチェック・動作確認（JavaScript等）
* MT組み込み（Component-websiteのthemeへ組み込み）
* 定数や変数の定義をする
* HTMLテンプレート分割したものをモジュールテンプレートに組み込む
* 必要なウェブページ・ブログを設定・構築する
* CMS化するブログのカスタムフィールドを作成
* ブログの作成
* 動作チェック（記事の投稿・出力結果の確認）
