FROM node:14-alpine

RUN apk update && apk add bash
RUN mkdir -p /app
RUN mkdir -p /app/client/dist
RUN chmod -R 777 /app/client/dist

WORKDIR /app/client
COPY . /app/client
