const express = require('express');
const router = express.Router();
const { Order, Product } = require('../dbModels.js');

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Order.findOne({
    where : { id : req.params.id },
    include : [ Product ]
  })
    .then(order => res.json(order))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.json(order))
});

router.delete('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.destroy())
    .catch(next)
})

module.exports = router;
