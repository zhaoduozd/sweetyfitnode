var express = require('express');
var app = express();

app.get('/account/login', function(req, res) {
    var username = req.query.u;
    var password = req.query.p;


    var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

    // Connection URL
    var url = 'mongodb://localhost:27017/sweetyfitnode';

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uname:username}).toArray(function(err, docs) {
            assert.equal(err, null);  
  
            if (docs.length == 0) {
                res.json({account: 0});
            } else {
                var user = docs[0];
                if (user.pwd) {
                    if (user.pwd == password) {
                      res.json({account:1});
                    } else {
                      res.json({account:0});
                    }
                } else {
                    res.json({account:0});
                }
            }
        });
        
    });
});

// app.get('/account/signin', function(req, res) {

//     var userinfo = {
//         'uname':'',
//         'password':'',
//         'nickname':'',
//         'birthday':'',
//         'selfintro':'',
//         'height':0,
//         'weight':0,
//         'chestline':0,
//         'waistline':0,
//         'hipline':0,
//         'gender':'',
//         'howbusy':[],
//         'trainaim':[],
//         'trainplace':[],
//         'traintime':[],
//         'bodyregion':[],
//     }
//     console.log("signin");
//     console.log(req.params);

//     // var MongoClient = require('mongodb').MongoClient
//     //    , assert = require('assert');

//     // // Connection URL
//     // var url = 'mongodb://localhost:27017/sweetyfitnode';

//     // // Use connect method to connect to the Server
//     // MongoClient.connect(url, function(err, client) {

//     //     assert.equal(null, err);
//     //     console.log("Connected correctly to server");

//     //     const db = client.db("accounts");
//     //     const usersinfo = db.collection("usersInfo");

//     //     usersinfo.find({uname:username}).toArray(function(err, docs) {
//     //         assert.equal(err, null);  
  
//     //         if (docs.length == 0) {
//     //             res.json({account: 0});
//     //         } else {
//     //             var user = docs[0];
//     //             if (user.pwd) {
//     //                 if (user.pwd == password) {
//     //                   res.json({account:1});
//     //                 } else {
//     //                   res.json({account:0});
//     //                 }
//     //             } else {
//     //                 res.json({account:0});
//     //             }
//     //         }
//     //     });
        
//     // });
// });

app.listen(3000);


