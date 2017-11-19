'use strict';

/**
 * Require Mongoose
 */
const mongoose = require("mongoose");

/**
 * Define the model Ingredient
 */
var ingredientSchema = mongoose.Schema({
    name: { type: String, unique: true },
    weight: Number, 
    price: Number
});
 
/**
 * Define ingredientSchema as collection 
 */
let ingredientModel = mongoose.model('ingredient', ingredientSchema);

/**
 * Export the model in order to access it in our project
 */
module.exports = ingredientModel;