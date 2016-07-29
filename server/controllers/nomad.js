/* require the modules needed */
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');
require('dotenv').config();

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
exports.requestNomad = function(city, callback) {
  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'https://nomadlist.com/api/v2/list/cities/';

  /* Add the query string to the url */
  var apiURL = url + city;

  console.log('This is the apiURL: ' + apiURL.toLowerCase());

  /* Then we use request to send make the API Request */
  request(apiURL.toLowerCase(), function(error, response, body) {
    return callback(error, response, body);
  });

};