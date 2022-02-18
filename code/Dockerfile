FROM node:16-alpine

RUN apk update
RUN apk add nano

WORKDIR /code

ENTRYPOINT yarn && yarn dev
