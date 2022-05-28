FROM node:14-alpine
RUN apk update && apk add bash

RUN mkdir -p /app
RUN mkdir -p /app/dist
RUN chmod -R 777 /app/dist
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm  install --verbose 

ENTRYPOINT ["npm", "run","dev"]

