'use strict';

/**
 * Require our pizza model
 */
const pizzaSchema = require('../../Model/pizza/pizza');

/**
 * Require the module needed
 */
const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");

/**
 * Configure body-parser
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

/**
 * Export router
 */
module.exports.router = router;


/**
 * -----------------------------------------------------------------------------
 * CRUD
 * -----------------------------------------------------------------------------
 */

/**
 * Get all pizzas
 */
router.get('/', (req, res, next) => {
    return pizzaSchema.find()
    .then((pizzas)=>{
        return res.json(pizzas);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});

/**
 * Get one pizza
 */
router.get('/:_id', (req, res, next) => {
    return pizzaSchema.findOne(req.params)
    .then((pizza)=>{
        return res.json(pizza);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});


/**
 * Post a new pizza
 */
router.post('/', (req, res, next) => {
    let pizzaS = new pizzaSchema(req.body);
    return pizzaS.save()
    .then((pizza)=>{
        global.io.emit('new pizza toast', pizza);
        global.io.emit('new pizza available', pizza);
        console.log('new pizza');
        return res.json(pizza);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});


/**
 * Put a pizza
 */
router.put('/', (req, res, next) => {
    return pizzaSchema.update(req.body, {new : true})
    .then((pizza)=>{
        global.io.emit('pizza modified', pizza);
        console.log('pizza modified');
        return res.json(pizza);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});


/**
 * Delete a pizza
 */
router.delete('/:_id', (req, res, next) => {
    return pizzaSchema.remove(req.params)
    .then((idPizza)=>{
        global.io.emit('pizza removed', idPizza);
        console.log('pizza removed');
        return res.json(idPizza);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});