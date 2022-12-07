FROM node:14-alpine AS build

RUN apk add git

WORKDIR /app

COPY . ./

RUN yarn install
RUN npx -p @angular/cli ng build --configuration "qa"

FROM nginx AS prod

COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/* /usr/share/nginx/html/