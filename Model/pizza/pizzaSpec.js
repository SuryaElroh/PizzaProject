'use strict';

const { assert } = require('chai');
const https = require("https");

const urlAPI = 'https://pizza-project-suryae.c9users.io/pizzas/';


/**
 * -----------------------------------------------------------------------------
 * FUNCTION THAT CALLS OUR API
 * -----------------------------------------------------------------------------
 */
 
/**
 * Get pizza
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
describe('test pizza model', () => {
    it('should get name, description, price, creationDate, modificationDate properties', (done) => {
        get(urlAPI + '5a1056ee7d41d24f69823c0b', (respData) => {
            assert.hasAnyKeys(respData, ['name']);
            assert.hasAnyKeys(respData, ['description']);
            assert.hasAnyKeys(respData, ['price']);
            assert.hasAnyKeys(respData, ['cDate']);
            assert.hasAnyKeys(respData, ['mDate']);
            done();
        });
    });
});
