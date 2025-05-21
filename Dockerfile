FROM node:24.0.2-alpine

WORKDIR /app

COPY . .

ENV NEXT_PUBLIC_SITE_API_URL="/api"
ENV NEXT_PUBLIC_GAMESTATUS_API_URL="https://gamestatus.info/back/api/gameinfo/game"

RUN npm install --legacy-peer-deps

RUN npm run build

CMD [ "npm","start" ]
