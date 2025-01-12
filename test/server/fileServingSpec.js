/*jslint node: true */

var frisby = require('frisby');

var URL = 'http://localhost:3000';

frisby.create('GET index.html when visiting application URL')
    .get(URL)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'text/html')
    .expectBodyContains('Juice Shop')
    .toss();

frisby.create('GET index.html when visiting application URL with any path')
    .get(URL + "/whatever")
    .expectStatus(200)
    .expectHeaderContains('content-type', 'text/html')
    .expectBodyContains('Juice Shop')
    .toss();

frisby.create('GET /public/ftp serves a directory listing')
    .get(URL + "/public/ftp")
    .expectStatus(200)
    .expectHeaderContains('content-type', 'text/html')
    .expectBodyContains('<title>listing directory /public/ftp</title>')
    .toss();

frisby.create('GET a non-existing Markdown file in /public/ftp will return a 404 error')
    .get(URL + "/public/ftp/doesnotexist.md")
    .expectStatus(404)
    .toss();

frisby.create('GET a non-existing text file in /public/ftp will return a 404 error')
    .get(URL + "/public/ftp/doesnotexist.txt")
    .expectStatus(404)
    .toss();

frisby.create('GET a non-existing file in /public/ftp will return a 403 error for invalid file type')
    .get(URL + "/public/ftp/doesnotexist.exe")
    .expectStatus(403)
    .toss();

frisby.create('GET an existing file in /public/ftp will return a 403 error for invalid file type')
    .get(URL + "/public/ftp/eastere.gg")
    .expectStatus(403)
    .toss();

frisby.create('GET the confidential file in /public/ftp')
    .get(URL + "/public/ftp/acquisitions.md")
    .expectStatus(200)
    .toss();

frisby.create('GET the easter egg file by using an encoded Poison Null Byte attack with .txt suffix')
    .get(URL + "/public/ftp/eastere.gg%2500.txt")
    .expectStatus(200)
    .toss();

frisby.create('GET the easter egg file by using an encoded Poison Null Byte attack with .md suffix')
    .get(URL + "/public/ftp/eastere.gg%2500.md")
    .expectStatus(200)
    .toss();

frisby.create('GET the second easter egg by visiting the hidden URL')
    .get(URL + "/the/devs/are/so/funny/they/hid/an/easter/egg/within/the/easter/egg")
    .expectStatus(200)
    .expectHeaderContains('content-type', 'text/html')
    .expectBodyContains('Nothing here yet! You still receive the Level-2-Easter-Egg-Badge! Congratulations!')
    .toss();