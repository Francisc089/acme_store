const express = require('express');
const router = express.Router();
const { Customer, Order } = require('../dbModels.js');

router.get('/', (req, res, next) => {
  Customer.findAll()
    .then(customers => res.json(customers))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Customer.findOne({
    where : { id : req.params.id },
    include : [ Order ]
  })
    .then(customer => res.json(customer))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  Customer.findById(req.params.id)
    .then(customer => customer.update(req.body))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Customer.create(req.body)
    .then(customer => res.json(customer))
    .catch(next)
});

router.delete('/:id', (req, res, next) => {
  Customer.findById(req.params.id)
    .then(customer => customer.destroy())
    .catch(next)
})

module.exports = router;