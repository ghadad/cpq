FROM node:14-alpine

RUN apk update && apk add bash
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install --verbose 

ENTRYPOINT ["npm", "run" ,"dev"] 
