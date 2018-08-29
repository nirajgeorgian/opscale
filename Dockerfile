FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./client/package*.json ./client/

RUN npm install
RUN cd client && npm install
WORKDIR /usr/src/app

COPY . .

EXPOSE 3030
EXPOSE 3000

CMD ["npm", "start"]
