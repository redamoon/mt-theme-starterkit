# Movable Type テンプレート構築用テーマ

構築に必要なモジュールをまとめたテーマになります。
その他のウィジェットやインデックステンプレート・アーカイブテンプレート・システムテンプレートを削除しています。

構築に必要なものだけに特化したテーマ[Visual themeテーマよりStarterket theme]になります。

mt-theme-starterket_websiteとmt-theme-starterket_blogを[MT_HOME/themes/]へアップロードしてお使いください。

## [Theme] mt-theme-starterket_website

ウェブサイトで使用するテーマになります。
Webで考えられる基本のモジュールを格納されています。

### File Organization

インストール後のモジュールについて

#### インデックステンプレート

* index.html

トップページで使用するインデックステンプレートになります。

* _format_template.html

新規テンプレート作成用のフォーマットファイル

#### アーカイブテンプレート

* ウェブページ

ウェブページで使用するアーカイブテンプレートになります。

※基本ウェブページは、ウェブサイトにぶら下げることを推奨

#### モジュールテンプレート

* config：すべての設定・blogID・変数を記述したテンプレート
* function：SetVarTemplate、SetVarBlockを記述したテンプレート
* html_head：htmlのhead情報テンプレート
* html_foot：htmlのfoot情報テンプレート（scriptのインクルード等）
* header：表示側のheaderテンプレート
* footer：表示側のfooterテンプレート
* navigation：表示側のnavigationテンプレート
* script：scriptを記述したテンプレート（local_scriptはページ固有で使用するためのmt:Var）

## [Theme] mt-theme-starterket_blog

すべてを空にしたテーマになります。
ブログで必要なテンプレートは、案件によって変わるため空にして、0ベースで構築することが可能です。

必要なモジュールをウェブサイトからインクルードで持ってくるようにしていきます。

```
<$mt:Include module="モジュール名" parent="1"$>
```

## Format

追加テンプレート用のフォーマットになります。

```
<mt:ignore>
========================================
Template Name : テンプレートの名前
Template Type : 用途（Layout・Module・Script・Web Page・Entries・Entry・Category） / （WebSite or Blog）
Template Note : テンプレートに対してのコメント
========================================
</mt:ignore>
<mt:Include module="config" parent="1" />
<mt:ignore>** ローカル変数 **</mt:ignore>
<mt:ignore>
<mt:SetVars>
// そのテンプレート固有で使いたい変数を格納してください。
</mt:SetVars>
</mt:ignore>

<mt:ignore>** 表示部分 **</mt:ignore>
<mt:Unless name="compress" regex_replace="/^\s*\n/gm","">

// コンテンツを入れてください。

</mt:Unless>
```

* Template Name Type Note（第三者がテンプレートを閲覧した時に把握するために記述）
* ローカル変数（テンプレート固有にmt:Varしたいケースの時に記述）
* 表示部分（出力される部分を記述）

## Tips

### functionの使い方

functionは汎用的なもの（ボタンや見出し等）をSetVarTemplateやSetVarBlockを用いてテンプレート化して自由に出力先でmt:Varできるような形を想定したテンプレートになります。

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
<mt:ignore>** Button Component：Set **</mt:ignore>
<mt:SetVarTemplate name="_base_button" key="button" note="ボタン">
<a class="<mt:Var name="_button_class" />" href="<mt:Var name="_button_link" />">
  <mt:Var name="_button_name" />
</a>
</mt:SetVarTemplate>
```

```
<mt:ignore>** Button Component：Build **</mt:ignore>
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