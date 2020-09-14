FROM node:12.16.1-alpine

WORKDIR /server
COPY package*.json /server/
RUN npm install
ENV PATH /server/node_modules/.bin:$PATH
ENV MONGO_URI mongodb://db:27017/tiki-products
ENV CLIENT http://localhost:3000
COPY . /server

EXPOSE 8080
CMD ["node", "dist/main"]
