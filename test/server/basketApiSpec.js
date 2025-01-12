/*jslint node: true */

var frisby = require('frisby'),
    insecurity = require('../../lib/insecurity');

var API_URL = 'http://localhost:3000/api';
var REST_URL = 'http://localhost:3000/rest';

var authHeader = { 'Authorization': 'Bearer ' + insecurity.authorize() } ;

frisby.create('GET existing basket by id is not allowed via public API')
    .get(REST_URL + '/basket/1')
    .expectStatus(401)
    .toss();

frisby.create('GET non-existing basket by id')
    .addHeaders(authHeader)
    .get(REST_URL + '/basket/4711')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('data', {})
    .toss();

frisby.create('GET existing basket by id with contained products')
    .addHeaders(authHeader)
    .get(REST_URL + '/basket/1')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('data', {
        id: 1
    })
    .expectJSONLength('data.products', 3)
    .toss();

frisby.create('POST new basket is not part of API')
    .addHeaders(authHeader)
    .post(API_URL + '/Baskets', {
        UserId: 1
    })
    .expectStatus(200)
    .expectJSON({status : 'error'})
    .toss();

frisby.create('GET all baskets is not part of API')
    .addHeaders(authHeader)
    .get(API_URL + '/Baskets')
    .expectStatus(200)
    .expectJSON({status : 'error'})
    .toss();

frisby.create('GET existing basket is not part of API')
    .addHeaders(authHeader)
    .get(API_URL + '/Baskets/1')
    .expectStatus(200)
    .expectJSON({status : 'error'})
    .toss();

frisby.create('PUT update existing basket is not part of API')
    .addHeaders(authHeader)
    .put(API_URL + '/Baskets/1', {
        UserId: 2
    })
    .expectStatus(200)
    .expectJSON({status : 'error'})
    .toss();

frisby.create('DELETE existing basket is not part of API')
    .addHeaders(authHeader)
    .delete(API_URL + '/Baskets/1')
    .expectStatus(200)
    .expectJSON({status : 'error'})
    .toss();

