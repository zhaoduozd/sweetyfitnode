/*
    Created by Dora Zhao
    Data Transfer

    /account : login, sign in, change pwd, get user personal info
    /reom : query execise, food, user exercise records
    /ui : query action lists, food lists
    /feedback : accept user feedback

*/

// ROOT URLs

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var fs = require('fs');

var rootpath = require('./Paths').rootpath;
var user = require('./account/user');
var recom = require('./recom/recom');
var ui = require('./ui/ui');
var feedback = require('./feedback/feedback');

var gifurl = 'resource/actiongif/';
var foodurl = 'resource/foodimg/';
var speech = 'resource/speech/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/*  Solve requests  */

// account and personal
app.get('/account/login', user.login);
app.get('/account/personal', user.personal);
app.post('/account/signin', user.signin);
app.post('/account/addinfo', user.addinfo);
app.get('/account/existaccount', user.existaccount);
app.get('/account/updateinfo', user.updateinfo);


// recommendation of exercise and food
app.post('/recom/exercise', recom.exercise);
app.post('/recom/food', recom.food);

// ui list
app.get('/ui/exercise', ui.uiexercise);
app.get('/ui/food', ui.uifood);

// feedback
app.get('/feedback/exerciserecord', feedback.exerciserecord);

// static resource

app.get('/resource/gifimg', function(req, res){
    var gid = req.query.gid;
    var path = rooturl + gifurl + gid;
    fs.access(path, function(err){
        if (!err) {
            res.sendFile(path);
        } else {
            res.sendFile(rooturl + gifurl + 'default.gif');
        }
    });
});

app.get('/resource/actionimg', function(req, res){
    var aid = req.query.aid;
    var path = rooturl + actionurl + aid + '.png';
    fs.access(path, function(err){
        if (!err) {
            res.sendFile(path);
        } else {
            res.sendFile(rooturl + actionurl + 'a1.png');
        }
    });

});

app.get('/resource/ffoodimg', function(req, res){
    var fid = req.query.fid;
    var path = rooturl + foodurl + fid;

    console.log(path);
     fs.access(path, function(err){
        if (!err) {
            res.sendFile(path);
        } else {
            res.sendFile(rooturl + foodurl + 'default.png');
        }
    });
});

app.listen(3000);


