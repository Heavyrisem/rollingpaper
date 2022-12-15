FROM node:16 as builder

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build


FROM node:alpine

WORKDIR /app
COPY --from=builder /app .

CMD ["yarn", "start:server"]