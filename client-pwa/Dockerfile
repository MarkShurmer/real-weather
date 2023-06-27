FROM node:lts as build-stage

LABEL name="real-weather web"
ENV APP_PORT=4000 APP_DIR=/app

WORKDIR $APP_DIR

ADD . .

RUN cat tsconfig-build.json
RUN yarn install --frozen-lock-file 
RUN yarn build

# FROM node:lts-alpine as deploy-stage
# WORKDIR /app
# COPY --from=build-stage /app/dist .

# HEALTHCHECK --interval=15s --timeout=10s --retries=3 CMD curl -f http://localhost:$APP_PORT || exit 1

# EXPOSE $APP_PORT

# ENTRYPOINT [ "yarn", "start" ]

FROM nginx

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage  /app/dist .
COPY deployment/*.conf /etc/nginx/conf.d/

ENTRYPOINT ["nginx", "-g", "daemon off;"]