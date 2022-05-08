FROM node:lts-alpine3.14

WORKDIR /backend

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm","run","start"]