# product-showcase-ui

## Installation
```
1. npm i
2. npm run start
```

## With Docker
Build Image
`docker build -t <your docker id>/product-showcase-ui .`

Run Image with local port :8888
`docker run 8888:8080 -d <your docker id>/product-showcase-ui`

## Dependency
This application requires web service app to run on http://localhost:3000/api (for development)
or
For production is configured in product-showcase-ui/environment/environment.prod.ts

## Heroku
This application is hosted on Heroku domain `https://product-showcase-ui.herokuapp.com/home`