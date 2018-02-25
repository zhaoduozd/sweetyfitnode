var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});




app.get('/', function(req, res) {
    res.json({user: 'tobi'});

})

app.listen(3000);
