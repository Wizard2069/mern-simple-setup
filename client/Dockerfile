FROM node:12.16.1-alpine

WORKDIR /client
COPY package*.json /client/
COPY mdbreact-4.25.0.tgz /client/
RUN npm install
COPY . /client

EXPOSE 3000
CMD ["npm", "start"]
