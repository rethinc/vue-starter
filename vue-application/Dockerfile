FROM node:20.12.2-alpine3.19 AS builder

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci
COPY . .
RUN npm run verify
RUN npm run build

FROM nginx1.25.4-alpine
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
