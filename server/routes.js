const express = require('express');
const router = express.Router();

const pokemons = require('./api/pokemons.json');

router.get('/pokemons', (req, res) => {
  res.status(200).json(pokemons);
});
module.exports = router;
