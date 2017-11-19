'use strict';

const { assert } = require('chai');
const https = require("https");
https.post = require('https-post');

const urlAPI = 'https://pizza-project-suryae.c9users.io/pizzas/';

const bddPizza = {
    "_id":"5a1056ee7d41d24f69823c0b",
    "mDate":"2017-11-18T15:51:10.322Z",
    "cDate":"2017-11-18T15:51:10.322Z",
    "name":"Savoyarde",
    "description":"pizza pour les grands soir d'hiver, avec pleins de fromage",
    "price":15.5,
    "__v":0,
    "ingredients":["5a05b36d87702990aeff73ad"]
};

const pizza = {
    "name":"Pizza test",
    "description":"pizza pour les tests",
    "price":12,
    "ingredients":["5a05b36d87702990aeff73ad"]
};



/**
 * -----------------------------------------------------------------------------
 * FUNCTION THAT CALLS OUR API
 * -----------------------------------------------------------------------------
 */
 
/**
 * Get one ingredient
 */
function get(url, callback){
    https.get(url, res => {
        let rawData ='';
        res.on('data', (chunk) => { rawData += chunk;});
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                callback(parsedData);
            } catch (e) {
                console.log(e);
            }
        });
    });
}
 
/**
 * Post one ingredient
 */
function post(url, ingredient, callback){
    https.post(url, ingredient, function(res){
        let rawData ='';
    	res.setEncoding('utf8');
    	res.on('data', function(chunk) {
    		console.log(chunk);
    	});
    	res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                callback(parsedData);
            } catch (e) {
                console.log(e);
            }
        });
    });
}



/**
 * -----------------------------------------------------------------------------
 * TESTS
 * -----------------------------------------------------------------------------
 */
describe('test getting pizza data', () => {
    it('should be ok to get all pizzas', (done) => {
        get(urlAPI, respData => {
            assert.isOk(respData);
            done();
        });
    });
    
    it('should have this pizza into the pizza list', (done) => {
        get(urlAPI, respData => {
            assert.exists(bddPizza);
            done();
        });
    });
    
    it('should get pizza by id', (done) => {
        get(urlAPI + '5a1056ee7d41d24f69823c0b', respData => {
            assert.hasAnyDeepKeys(respData, bddPizza);
            done();
        });
    });
    
    it('should be ok to get pizza by id', (done) => {
        get(urlAPI + '5a1056ee7d41d24f69823c0b', respData => {
            assert.isOk(respData);
            done();
        });
    });
    
});


describe('test post pizza then check', () => {
    it('should post a pizza', (done) => {
        post(urlAPI, pizza, respData => {
            done();
        });
    });
    
    it('should have this pizza in list', (done) => {   
        get(urlAPI, respData => {
            assert.exists(pizza);
            done();  
        });
    });
});