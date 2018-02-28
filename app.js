/*
    Created by Dora Zhao
    Data Transfer
*/


var express = require('express');
var user = require('./account/user');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.get('/account/login', user.login);
app.post('/account/signin', user.signin);
app.post('/account/addinfo', user.addinfo);


app.listen(3000);


