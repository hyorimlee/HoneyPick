FROM node:lts

WORKDIR /backend

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm","run","start"]