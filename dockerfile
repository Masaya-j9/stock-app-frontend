FROM node:lts-buster-slim

WORKDIR /app

COPY src/package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY src .

# アプリケーションをビルド
RUN npm run build

EXPOSE 3000

# コンテナが起動する時に実行されるコマンド
CMD ["npm", "start"]