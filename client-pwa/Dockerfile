FROM node:alpine:18.15.1 as build-stage

LABEL name="app-name"
ENV APP_PORT=3000 APP_DIR=/app

WORKDIR APP_DIR

ADD package.json .
ADD yarn.lock .
ADD src .

RUN yarn install --frozen-lock-file 
RUN yarn build

FROM node:alpine:18.15.1 as deploy-stage
ADD dist .
ADD public .

HEALTHCHECK --interval=15s --timeout=10s --retries=3 CMD curl -f http://localhost:APP_PORT/health || exit 1

EXPOSE APP_PORT

ENTRYPOINT [ "node", "main.js" ]

CMD [ "" ]
