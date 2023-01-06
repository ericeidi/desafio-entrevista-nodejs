# 🚗🏍️ Parking Lot API

Welcome to the Parking lot API system!

This system was developed in order to manage cars and motorcycles which are parked in a certain company. It comes with the following features:

- Management of vehicle type information including model, license plate, brand and vehicle type.
- Management of company information including name, cnpj, address, telephone, car spaces and motorcycle spaces.
- Management of user including name, email, username and password.
- Inclusion of one or more vehicles for an user.
- Management of parking spaces and preventing parking in occupied spaces of a certain company.

## ⌨️ Technologies

- NestJS
- Swagger
- Typeorm
- MySql
- Google Cloud Platform

## 🖥️ Design Pattern
The system was produced using the Domain Driven Design Pattern (DDD)

## 🌠 Starting the Application

### `develop`

Start the application using the following command:

```
npm run start:dev
```
Make sure you already have installed the dependencies, if not, just use the command
```
npm install
```

### `start`

Start the application using the following command:

```
npm run start
```
Make sure you already have installed the dependencies, if not, just use the command
```
npm install
```

### `build`

Build the application using the following command:

```
npm run build
```
Make sure you already have installed the dependencies, if not, just use the command
```
npm install
```

You can also build the application using the following command one your terminal:
```
docker compose up --build
```
Make sure you already have installed docker, if not go to [Docker Download](https://www.docker.com/products/docker-desktop/)

## ⛅ Google Cloud Platform

### `push`
```
docker tag desafio-entrevista-nodejs_backend gcr.io/desafio-nodejs/desafio-entrevista-nodejs_backend
docker push gcr.io/desafio-nodejs/desafio-entrevista-nodejs_backend
```

### `deploy`
```
gcloud run deploy desafio-entrevista-nodejs-backend --image gcr.io/desafio-nodejs/desafio-entrevista-nodejs_backend --port=3000 --set-env-vars MYSQL_HOST=containers-us-west-190.railway.app,MYSQL_PORT=8062,MYSQL_USER=root,MYSQL_PASSWORD=7rwEffKFEFVljHANbrMC,MYSQL_DATABASE=railway
```

This application can be reached out at the following link: [Parking Lot API](https://desafio-entrevista-nodejs-backend-fmiv7zqucq-uc.a.run.app/)

## 🛣️ Endpoints

All the endpoints available in the app can be accessed with the swagger API at the following link: 

### `develop`
[Swagger Doc Dev](http://localhost:3000/api)
### `production`
[Swagger Doc Prod](https://desafio-entrevista-nodejs-backend-fmiv7zqucq-uc.a.run.app/api)

