FROM node:lts as build-stage
LABEL name="real-weather-server"
ENV APP_PORT=3000

WORKDIR /app

COPY . .

RUN yarn install --frozen-lock-file 
RUN yarn build


FROM node:lts as deploy-stage
WORKDIR /app

COPY --from=build-stage app/dist . 
COPY --from=build-stage app/config .
COPY --from=build-stage app/package.json .

RUN yarn install --frozen-lock-file --production

HEALTHCHECK --interval=15s --timeout=10s --retries=3 CMD curl -f http://localhost:$APP_PORT/health-check || exit 1

EXPOSE $APP_PORT

ENTRYPOINT [ "node", "src/index.js" ]


