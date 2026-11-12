# Marp テンプレート

[サンプル](slides/example.md)をコピーして使えます。

## 準備と出力

Node.js、PDF出力用の Chrome・Edge・Firefox のいずれか、[Hack Nerd Font](https://www.nerdfonts.com/font-downloads) が必要です。フォントがない場合、アイコンが文字化けします。

```sh
brew install --cask font-hack-nerd-font  # macOS の場合
npm install
npm run preview  # プレビュー
npm run build    # dist/example.html
npm run pdf      # dist/example.pdf
```

VS Codeでは [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode) をインストールし、このフォルダーを開くとテーマが登録されます。ブラウザが自動検出されない場合は `CHROME_PATH` に実行ファイルを指定してください。

任意のファイルを出力する場合：

```sh
npx marp slides/my-talk.md --html --allow-local-files \
  --theme-set themes/n4mlz.css -o dist/my-talk.pdf
```

`--html` はHTML、`--allow-local-files` はローカル画像などの読み込みを許可します。信頼できるスライドに使用してください。

## 基本

```markdown
---
marp: true
theme: n4mlz
paginate: true
---

<!-- header: はじめに -->

# 見出し

- 項目
- **強調**
  - 第2階層

---

<!-- header: 次の章 -->

# 次の見出し
```

`header` は以後のページに引き継がれ、`_header` はそのページだけに適用されます。表紙もページ番号に含まれます。番号を隠すには `<!-- _paginate: false -->` を指定します。

## 表紙とアイコン

```markdown
<!-- _class: title simple -->
<!-- _header: 'イベント名 2026/03/20' -->

# <span class="nf" style="color: #222; --icon-offset-y: 0px" aria-label="Rust">&#xe7a8;</span> タイトル

![プロフィール](../assets/icon.png) n4mlz

[@n4mlz](https://github.com/n4mlz) [@n4mlz](https://x.com/n4mlz)
```

- タイトル、画像と名前、SNSリンクを別の段落にします。画像パスはMarkdownファイルからの相対パスです。
- GitHub・X・TwitterのアイコンはURLから選ばれ、リンクの順序は自由です。Xには文字 `𝕏` を使います。
- アイコンのコードポイントは[Nerd Fonts チートシート](https://www.nerdfonts.com/cheat-sheet)で探せます。`color` は色、`--icon-offset-y` はタイトルのアイコンの縦位置です。正の値で下へ移動します。省略時は本文では文字色、タイトルでは濃いグレーです。
- 自由な配置には `title` クラスと `cover-title` / `cover-author` のHTMLも使えます。

## 文字の自動縮小

スライドの先頭でスクリプトを読み込み、縮小したい本文を囲みます。見出しは枠の外に置きます。

```html
<script src="../assets/fit.js"></script>
```

```markdown
# 見出し

<div class="fit" style="height: 420px">
<div>

- 本文をここに書きます
- 項目を増やせます

</div>
</div>
```

枠の高さは省略時420pxです。はみ出す場合だけ文字が小さくなります。固定サイズの画像やコード、非常に多い内容は収まらない場合があります。小さくなりすぎる場合はページを分けてください。

Marp CLIのHTML・PDF出力で確認済みです。JavaScriptが制限されたプレビューでは動作しません。HTMLを移動する際は `assets/fit.js` への相対パスを維持してください。スクリプトを実行するため、信頼できるスライドに使用してください。

## その他のレイアウト

- `<!-- _class: section-title -->`：章の区切り。
- `small`：小さい文字。`center`：中央揃え。
- `columns`：2つの `div` を横に並べます。HTMLタグとMarkdownの間には空行を入れてください。
- Markdownの表とコードブロックにもテーマが適用されます。

記法の例は[サンプル](slides/example.md)、配色・余白の設定は[テーマCSS](themes/n4mlz.css)を参照してください。日本語フォントと `𝕏` の字形は環境により異なります。PowerPointの自由配置やアニメーションは再現されません。
