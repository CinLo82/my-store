const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      imgen: faker.image.imageUrl(),
    });

  }
  res.json(products);
});


router.get('/filter', (req, res) => {
  console.log('yo soy un filter');
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'product 2',
    price: 2000
  });
});

module.exports = router;
