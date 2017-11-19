'use strict';

/**
 * Require our ingredient model
 */
const ingredientSchema = require('../../Model/ingredient/ingredient');

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
 * Get all ingredients
 */
router.get('/', (req, res, next) => {
    return ingredientSchema.find()
    .then((ingredients)=>{
        return res.json(ingredients);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});


/**
 * Get one ingredient by its id
 */
router.get('/:_id', (req, res, next) => {
    return ingredientSchema.findOne(req.params)
    .then((ingredient)=>{
        return res.json(ingredient);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
}); 


/**
 * Get one ingredient by its name
 */
router.get('/name/:name', (req, res, next) => {
    return ingredientSchema.findOne(req.params)
    .then((ingredient)=>{
        console.log(req.params);
        return res.json(ingredient);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});


/**
 * Post a new ingredient
 * And emit it to informe there is a new one
 */
router.post('/', (req, res, next) => {
    let ingredientS = new ingredientSchema(req.body);
    return ingredientS.save()
    .then((ingredient)=>{
        global.io.emit('new ingredient toast', ingredient);
        global.io.emit('new ingredient available', ingredient);
        return res.json(ingredient);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});


/**
 * Put an ingredient
 */
router.put('/', (req, res, next) => {
    return ingredientSchema.update({_id: req.body._id},req.body, {new : true})
    .then((modifyIngredient)=>{
        console.log(`Ingredient modifié`);
        return res.json(modifyIngredient);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});


/**
 * Delete an ingredient
 */
router.delete('/:_id', (req, res, next) => {
    return ingredientSchema.remove(req.params)
    .then((idIngredient)=>{
        console.log(`Ingredient supprime`);
        return res.json(idIngredient);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    }); 
});
