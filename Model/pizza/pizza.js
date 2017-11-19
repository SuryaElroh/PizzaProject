'use strict';

/**
 * Require Mongoose
 */
const mongoose = require("mongoose");

/**
 * Define the model Pizza
 */
var pizzaSchema = mongoose.Schema({
    name: { type: String, unique: true },
    description: String, 
    price: Number, 
    cDate: Date,
    mDate: Date,
    image: String,
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredient', require : true }]
});
 

/**
* Modify data before saving
*/
pizzaSchema.pre('save', function(next) {
    // get the current date
    let currentDate = new Date();
    
    /**
    * Insert the today date into into cDate
    * @return {Date} cDate;
    */
      this.cDate = currentDate; 

    /**
    * Insert the today date into into mDate
    * @return {Date} mDate;
    */
      this.mDate = currentDate; 
  next();
});


/**
* Modify data before updating
*/
pizzaSchema.pre('update', function(next) {
    // get the current date
    let currentDate = new Date();
      
    /**
    * Insert the today date into into mDate
    * @return {Date} mDate;
    */
      this.mDate = currentDate; 
  next();
});


/**
 * Define pizzaSchema as collection 
 */
let pizzaModel = mongoose.model('pizza', pizzaSchema);

/**
 * Export the model in order to access it in our project
 */
module.exports = pizzaModel;