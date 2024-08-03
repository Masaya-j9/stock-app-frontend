# 開発用 Dockerfile
FROM node:lts-buster-slim

WORKDIR /app

# package.json と package-lock.json をコピー
COPY src/package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY src .

# ポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]