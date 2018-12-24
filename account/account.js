var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';

function login(req, res) {
    var username = req.query.u;
    var password = req.query.p;

    console.log(username, password);

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("Login Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({}).toArray(function(err, docs) {
            console.log(docs);
        })

        usersinfo.find({uid:username}).toArray(function(err, docs) {
            assert.equal(err, null);  
  
            if (docs.length == 0) {
                res.json({'login':'fail'});
                console.log('no username');
            } else {
                var user = docs[0];
                if (user.pwd) {
                    if (user.pwd == password) {
                      res.json({'login':'succeed'});
                    } else {
                        console.log('passwordwrong');
                      res.json({'login':'fail'});
                    }
                }
            }
        });
    });
};

function signin(req, res) {
    var userdata = req.body;


    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Sign In Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uid:userdata.uid}).toArray(function(err, docs) {
            assert.equal(err, null);  
            console.log(docs);
            if (docs.length > 0) {
                res.json({'signin':'fail', 'reason':'repeat username'});
            } else {
                usersinfo.insertOne(userdata)
                .then(function(){
                    res.json({'signin':'succeed', 'reason':''});
                });
            }
        });
    });
};

function existaccount(req, res) {
    var uname = req.query.u;
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Sign In Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uid:username}).toArray(function(err, docs) {
            assert.equal(err, null);  
  
            if (docs.length > 0) {
                res.json({'acceptable':'NO'});
            } else {
                res.json({'acceptable':'YES'});
            }
        });
    });
}

exports.login = login;
exports.signin = signin;
exports.existaccount = existaccount;

