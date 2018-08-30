FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY ./client/package*.json ./client/
RUN cd client && npm install

WORKDIR /usr/src/app

COPY . .

EXPOSE 8081 
EXPOSE 80 

CMD ["npm", "start"]
