
var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';

exports.login = function(req, res) {
    var username = req.query.u;
    var password = req.query.p;

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("Login Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uid:username}).toArray(function(err, docs) {
            assert.equal(err, null);  
  
            if (docs.length == 0) {
                res.json({'login':'fail'});
            } else {
                var user = docs[0];
                if (user.pwd) {
                    if (user.pwd == password) {
                      res.json({'login':'succeed'});
                    } else {
                      res.json({'login':'fail'});
                    }
                }
            }
        });
    });
};

exports.signin = function(req, res){
    var userdata = req.body;

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Sign In Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uid:userdata.uid}).toArray(function(err, docs) {
            assert.equal(err, null);  
  
            if (docs.length > 0) {
                res.json({'signin':'fail', 'reason':'repeat signin'});
            } else {
                usersinfo.insertOne(userdata)
                .then(function(){
                    res.json({'signin':'succeed', 'reason':''});
                });
            }
        });
    });
};

exports.addinfo = function(req, res) {
    var usertemp = req.body;
     
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Add Info Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.update(
           {uid:usertemp.uid},
           {
             $set: {
                gender: usertemp.gender,
                howbusy: usertemp.howbusy,
                chestline: usertemp.chestline,
                waistline: usertemp.waistline,
                hipline: usertemp.hipline,
                height: usertemp.bodyHeight,
                weight: usertemp.bodyWeight,
                bodyregion: usertemp.bodyRegion,
                trainaims: usertemp.trainaims,
                traintimes: usertemp.traintimes,
                trainplaces: usertemp.trainplaces
             }
           }
        );

        res.json({"update":"succeed"});
    });
}







