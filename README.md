# よりみち青森

青森県の観光スポット・食事処・温泉を探す、レスポンシブな観光ガイドです。奥入瀬渓流、弘前公園、酸ヶ湯温泉、青森魚菜センターなど、12スポットをサンプル収録しています。

## 開発

Node.js 22.12以上（クラウド環境では24系）、npmを使用します。

```sh
cd /workspace/Aomori-tourism-map
npm ci
npm run dev -- --port 5173
```

開発サーバーはポート5173で起動します。APIキー・データベース・環境変数の設定は不要です。

```sh
npm run build       # 型検査と本番ビルド（dist/）
npm run preview     # 本番ビルドをローカルで確認
npm test            # スポットデータと絞り込みのテスト
```

## ブラウザテスト

```sh
npx playwright install chromium
npm run test:e2e
```

システムのChromiumを使う場合（このクラウド環境）：

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Playwrightが必要に応じて開発サーバーを起動します。検索・カテゴリとエリアの組み合わせ・保存と再読込・地図・詳細ダイアログ・都道府県選択・スマートフォン表示を検証します。

## 機能

- スポット名・読み方・キーワード検索、カテゴリとエリアの絞り込み、名前順での並び替え
- ブラウザのlocalStorageを使ったお気に入り保存（アカウント不要）
- 県境データを使ったエリアマップとスポット選択、拡大・縮小
- 詳細紹介、訪問のヒント、Googleマップ・公式／観光案内サイトへのリンク
- スマートフォンでの一覧・地図切り替え、キーボード操作、ダイアログのフォーカス制御

他の46都道府県は選択画面で「準備中」と表示しています。現在利用できるガイドは青森県のみです。

## 構成と情報について

- `src/data/spots.ts`：型定義、サンプルデータ、絞り込み処理。各スポットは都道府県ID・カテゴリ・エリア・緯度経度・案内リンクを持ちます。
- `src/AreaMap.tsx`：外部の地図タイルやAPIに依存しないSVGエリアマップ。
- `src/Art.tsx`：オリジナルのイメージイラスト。実際の写真ではありません。
- `src/data/boundaries.json`：青森県と周辺の県境を簡略化したデータ。

営業時間・料金など変動する情報は掲載せず、訪問前の公式情報の確認を案内しています。飲食店の魚種やメニューも仕入れにより変わります。地図のスポット位置は目安で、道路案内はGoogleマップへのリンクを利用します。

県境データ出典：**地球地図日本（国土地理院）**。取得元：[dataofjapan/land](https://github.com/dataofjapan/land)。同リポジトリのGeoJSONから北海道・青森県・秋田県・岩手県を抽出し、ポリゴンを簡略化しています。データの利用条件は配布元をご確認ください。

## GitHub Pagesでの公開

```sh
npm ci
npm run build:pages
```

`dist/` をGitHub Pagesの配布元へ配置します。リポジトリ名に合わせた `/Aomori-tourism-map/` のベースパスを指定しているため、JavaScript・CSS・アイコンも公開先から読み込めます。公開ブランチ `gh-pages` を使う場合は、ブランチのルートに `dist/` の内容と空の `.nojekyll` を置きます。

GitHubのリポジトリ設定で **Pages → Build and deployment → Deploy from a branch → gh-pages / (root)** を選択して保存します。公開後のURLは `https://keigo9260.github.io/Aomori-tourism-map/` です。URLが利用可能になるにはGitHub Pagesの有効化とデプロイの完了が必要です。
