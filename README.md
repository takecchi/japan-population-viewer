# japan-population-viewer

都道府県別の総人口推移グラフを表示します。

## Getting Started

### Environment

人口を取得するために[RESAS API](https://opendata.resas-portal.go.jp/)を使用しています。  
事前にAPIキーの払い出しをお願いします。

1. `.env`を`.env.local`にコピー
2. `.env.local`の`RESAS_API_KEY`に払い出したAPIキーを貼り付け

### Run the Development Server

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いて確認出来ます。

### Run the Storybook

```bash
npm run storybook
```

[http://localhost:6006](http://localhost:6006) を開いて確認出来ます。

## Directories

### [/src](./src)

ソースコード置き場。  
詳しくは[こちら](./src)を御覧ください。

### [/public](./public)

静的資材置き場

## Libraries & Framework

- Next.js
- TypeScript
- Kuma UI ... ゼロランタイム CSS-in-JS
- Storybook ... コンポーネントのカタログ & テスト
- prettier ... フォーマッタ

## Coding rule

### Commit message

特に決まりはありません。  
ただ、PRのタイトルがそのままコミットメッセージになるので、
タイトルで何をしたか分かるように記述すること。

### Repository model

[GitHub flow](https://docs.github.com/ja/get-started/quickstart/github-flow)を採用しています。  
作業をする際には`feature/**`のように作業用ブランチを作成し、`main`に対してプルリクエストを出してください。
