FROM node:16.16.0-slim as builder

WORKDIR /app

COPY ./package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:16.16.0-slim

WORKDIR /var/api/
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY .env ./

RUN npm install --production

EXPOSE 3000


CMD ["npm", "run", "start:prod"]


