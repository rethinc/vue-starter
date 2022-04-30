FROM node:17.6.0 AS builder

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci
COPY . .
RUN npm run verify
RUN npm run build

FROM nginx:1.21.4-alpine
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80