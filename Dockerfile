FROM node:16 as builder

WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

COPY . .
RUN yarn build


FROM node:alpine

WORKDIR /app
COPY --from=builder /app .

CMD ["yarn", "start:server"]