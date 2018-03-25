/*
    Created by Dora Zhao
    Data Transfer
*/

/*

    /account : login, sign in, change pwd, get user personal info
    /reom : query execise, food, user exercise records
    /ui : query action lists, food lists
    /feedback : accept user feedback

*/

// ROOT URLs

var rooturl = '/Users/duozhao/Documents/GitHub/sweetyfitnode/';
var gifurl = 'resource/actiongif/';
var foodurl = 'resource/foodimg/';
var speech = 'resource/speech/';


// OBJECTs

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var fs = require('fs');

// Dora's Objects

var user = require('./account/user');
// var recom = require('./recom/recom');
// var ui = require('./ui/ui');
// var feedback = require('./feedback/feedback');

// Parse

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Solve requests

// about account and personal
app.get('/account/login', user.login);
app.get('/account/personal', user.personal);
app.post('/account/signin', user.signin);
app.post('/account/addinfo', user.addinfo);
app.get('/account/existaccount', user.existaccount);
app.get('/account/updateinfo', user.updateinfo);


// about recommendation of exercise and food

// app.post('/recom/exercise', recom.exercise);
// app.post('/recom/food', recom.food);

// about ui list
// app.get('/ui/exercise', ui.uiexercise);
// app.get('/ui/food', ui.uifood);

// about feedback
// app.get('/feedback/exerciserecord', feedback.exerciserecord);

// response static resource

// app.get('/resource/gifimg', function(req, res){
//     var gid = req.query.gid;
//     var path = rooturl + gifurl + gid;
//     fs.access(path, function(err){
//         if (!err) {
//             res.sendFile(path);
//         } else {
//             res.sendFile(rooturl + gifurl + 'default.gif');
//         }
//     });
    
// });

// app.get('/resource/foodimg', function(req, res){
//     var fid = req.query.fid;
//     var path = rooturl + foodurl + fid;

//     console.log(path);
//     fs.access(path, function(err){
//         if (!err) {
//             res.sendFile(path);
//         } else {
//             res.sendFile(rooturl + foodurl + 'default.png');
//         }
//     });
// });

// app.get('/resource/speech', function(req, res){
//     var sid = req.query.sid;
//     res.sendFile(rooturl + speechurl +sid);
// });

app.listen(3000);


