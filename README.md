# E-commerce project 

Client-side: React, MDBBootstrap, Redux (for practice only, not necessary)

Server-side: NestJs (use typescript), TypeORM (for mapping entity to database)

Database: MongoDB

###
 
This project fetch data from Tiki.vn, save data to MongoDB and display information about products in web browser. There are about 12 categories, each with about 30 products. User can sorting products based on its price, stars from low to high and vice versa.
In the detail page, user can buy product by clicking link follow to Tiki, read useful reviews from another customers (about 10 reviews) to decide to buy or not. Data is updated based on Tiki API at 3 a.m each day.

### Run application using docker-compose 

```sh
$ docker-compose up
```

### Run application seperately 

Client-side

```sh
$ cd client
$ npm install 
$ npm start
```

Server-side

```sh
$ cd server-nest
$ npm install 
$ npm run start:dev
```

Database 

Require MongoDB in local environment to run.

Create an .env file with following content in server-nest folder:

```
MONGO_URI=mongodb://localhost:27017/tiki-products
CLIENT=http://localhost:3000
```

### Test it

When everything is done, go to http://localhost:3000 in browser to see website.

