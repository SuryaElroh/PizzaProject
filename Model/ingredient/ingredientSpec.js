'use strict';

const { assert } = require('chai');
const https = require("https");

const urlAPI = 'https://pizza-project-suryae.c9users.io/ingredients/';


/**
 * -----------------------------------------------------------------------------
 * FUNCTION THAT CALLS OUR API
 * -----------------------------------------------------------------------------
 */
 
/**
 * Get ingredient
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
 * -----------------------------------------------------------------------------
 * TESTS
 * -----------------------------------------------------------------------------
 */
describe('test ingredient model', () => {
    it('should get name, weight and price properties', (done) => {
        get(urlAPI + '5a05b36d87702990aeff73ad', (respData) => {
            assert.hasAnyKeys(respData, ['name'] );
            assert.hasAnyKeys(respData, ['weight'] );
            assert.hasAnyKeys(respData, ['price'] );
            done();
        });
    });
});
