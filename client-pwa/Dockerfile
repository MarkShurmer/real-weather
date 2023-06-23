FROM node:lts-alpine as build-stage

LABEL name="real-westher web"
ENV APP_PORT=4000 APP_DIR=/app

WORKDIR $APP_DIR

ADD . .

RUN cat tsconfig-build.json
RUN yarn install --frozen-lock-file 
RUN yarn build

# FROM node:alpine:18.15.1 as deploy-stage
# ADD dist .
# ADD public .
FROM httpd:alpine as deploy-stage
# WORKDIR /var/www/html
COPY --from=build-stage /app/dist /usr/local/apache2/htdocs/

# HEALTHCHECK --interval=15s --timeout=10s --retries=3 CMD curl -f http://localhost || exit 1

# EXPOSE $APP_PORT

# ENTRYPOINT [ "yarn", "start" ]

