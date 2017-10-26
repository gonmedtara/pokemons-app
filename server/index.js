const express = require('express');
const path = require('path');
const fs = require('fs');
// var cors = require('cors');

const bodyParser = require('body-parser');
// const routes = require('./routes');
const pokemons = require('./api/pokemons.json');
const app = express();


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', true);
  next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/api', routes);

app.get('/pokemons', (req, res, next) => {
  res.status(200).json(pokemons);
});

app.post('/pokemons', (req, res, next) => {
  console.log(req.body);
  pokemons.push(req.body);
  res.status(200).json(pokemons);
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));
