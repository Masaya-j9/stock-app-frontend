## 使用しているバージョンについて

- node.js v20.12.2
- TypeScript v5.8.2
- npm v10.5.0
- Next.js v14.2.5

## 主なライブラリについて

- UI：Material UI
- test：Vitest

## デザインについて
- [Figma](https://www.figma.com/design/CVUfRrAfoZNpZXIXy2FNUx/Material-UI-for-Figma--and-MUI-X---Community-?node-id=8619-14401&t=mzDvnmYjpOUn7HuT-0)にデザインモックを作成


## APIについて
- [在庫管理APIのリポジトリ](https://github.com/Masaya-j9/stock-app-backend/tree/main)を利用
- 在庫管理APIのリポジトリにREADMEの説明どおりに環境構築を実施し、起動してAPIドキュメントを確認すること！


## ディレクトリ構造について(App Routerを使用)
```
.
├── README.md
├── docker-compose.yml
├── dockerfile
└── src
    ├── README.md
    ├── app
    ├── components
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── test
    ├── theme
    ├── tsconfig.json
    ├── types
    └── vitest.config.ts
```
## ローカル環境での起動方法
1. ディレクトリを移動
```
cd src
```

2. パッケージのインストール
```
npm i
```

3. ローカルサーバーの起動
```
npm run dev
```

4. buildの実行
```
npm run build
```

5. lintの実行
```
npm run lint
```

6. テストの実行
```
npm run test
```

## Dockerによる起動方法

### buildコマンド
```
 docker compose build
```

### 起動
```
 docker compose up -d
```

### インストール関連
```
docker compose run app npm i --save dev {ライブラリ名}
```
