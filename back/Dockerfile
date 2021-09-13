FROM node:14.15.0

WORKDIR /usr/src/app/back

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]