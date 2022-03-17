FROM node:17.6.0

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY . .
RUN npm run lint
RUN npm run build

FROM nginx:1.21.4-alpine
ARG version
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/dist /usr/share/nginx/html
ENV version=$version
EXPOSE 80