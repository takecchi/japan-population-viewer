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

ソースコード置き場

### [/public](./public)

静的資材置き場
