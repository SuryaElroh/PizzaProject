'use strict';

/**
 * API pour la vente de pizzas
 * @author Surya Elroh
 */
 
/**
 * Require all the needed module
 */
const path       = require('path');
const express    = require('express');
const app        = express();
const http       = require('http');
const server     = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Listen to the right port
 */
const port = process.env.PORT || 3000;
server.listen(port, () => {
});


/**
 * Allows origin access
 */
app.use(cors());


/**
 * -----------------------------------------------------------------------------
 * Socket.io
 * -----------------------------------------------------------------------------
 */
 
 /** 
  * Require and set socket.io
  */
const io = require('socket.io').listen(server);

/**
 * listen to connection
 */
io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

/**
 * Set io global in order to access it in all the project
 */
global.io = io;


/**
 * -----------------------------------------------------------------------------
 * MONGOOSE
 * -----------------------------------------------------------------------------
 */

/**
 * Require and set up the mongoose connection
 */
const mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/vegPizza', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});


/**
 * Configure body-parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/**
 * Configure express
 */
app.use(express.static(path.join(__dirname, 'View')));


/**
 * Require our controllers
 */
const Pizza = require ('./Controller/pizza/pizzaController');
const Ingredient = require('./Controller/ingredient/ingredientController');


/**
 * Define our routes
 */
app.use('/pizzas', Pizza.router);
app.use('/ingredients', Ingredient.router);