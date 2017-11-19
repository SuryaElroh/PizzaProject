'use strict';

const { assert } = require('chai');
const https = require("https");
https.post = require('https-post');

const urlAPI = 'https://pizza-project-suryae.c9users.io/ingredients/';

const bddIngredient = {
    "_id": "5a0ec3e71f554ee9e12925e4",
    "name": "Poivrons",
    "weight": 400,
    "price": 0.8,
    "__v": 0
};

const ingredient = {
    "name": "Ingredient test",
    "weight": 500,
    "price": 1.3
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
describe('test getting ingredient data', () => {
    it('should be ok to get all ingredients', (done) => {
        get(urlAPI, respData => {
            assert.isOk(respData);
            done();
        });
    });
    
    it('should have this ingredient into the ingredient list', (done) => {
        get(urlAPI, respData => {
            assert.exists(bddIngredient);
            done();
        });
    });
    
    it('should get ingredient by id', (done) => {
        get(urlAPI + '5a0ec3e71f554ee9e12925e4', respData => {
            assert.hasAnyDeepKeys(respData, bddIngredient);
            done();
        });
    });
    
    it('should be ok to get ingredient by id', (done) => {
        get(urlAPI + '5a0ec3e71f554ee9e12925e4', respData => {
            assert.isOk(respData);
            done();
        });
    });
    
    it('should be ok to get ingredient by name', (done) => {
        get(urlAPI + '/name/Poivrons', respData => {
            assert.isOk(respData);
            done();
        });
    });
});


describe('test post ingredient then check', () => {
    it('should post an ingredient', (done) => {
        post(urlAPI, ingredient, respData => {
            done();
        });
    });
    
    it('should have this ingredient in list', (done) => {   
        get(urlAPI, respData => {
            assert.exists(ingredient);
            done();  
        });
    });
});