FROM node:14-alpine

RUN apk update && apk add bash
RUN mkdir -p /app
RUN mkdir -p /app/client/dist
RUN chmod -R 777 /app/client/dist



COPY package.json /app/client
COPY package-lock.json /app/client
WORKDIR /app/client
RUN npm install --verbose 
 
#ENTRYPOINT ["npm", "run" ,"dev"] 
