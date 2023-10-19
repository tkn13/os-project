FROM node:slim

WORKDIR /app

ENV PORT 3000

EXPOSE ${PORT}

COPY ./backend/package.json /app/package.json

RUN npm install

COPY . /app

WORKDIR /app/backend

CMD [ "npm", "start" ]