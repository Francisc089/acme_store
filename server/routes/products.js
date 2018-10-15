const router = require('express').Router();
const { Product } = require('../dbModels.js');

router.get('/', (req, res, next) => {
  Product.findAll()
  .then(products => res.json(products))
  .catch(next)
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.json(product))
});

router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destrouy())
    .catch(next)
});

module.exports = router;