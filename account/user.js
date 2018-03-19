var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';

function login(req, res) {
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

function signin(req, res) {
    var userdata = req.body;

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Sign In Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uid:userdata.uid}).toArray(function(err, docs) {
            assert.equal(err, null);  
  
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

function addinfo(req, res) {
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
                height: usertemp.height,
                weight: usertemp.weight,
                regions: usertemp.regions,
                effects: usertemp.effects,
                times: usertemp.times,
                places: usertemp.places,
                level: usertemp.level,
                history:[]
             }
           }
        );

        res.json({"update":"succeed"});
    });
}

function personal (req, res) {
    var uid = req.query.u;

    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("Personal Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({'uid':uid}).toArray(function(err, docs) {
            assert.equal(err, null);  
  
            if (docs.length == 0) {
                res.json({'status':'uid or pwd is wrong!'});
            } else {
                var user = docs[0];
                
                
            }
        });
    });
}

function updateinfo(req, res){
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
                height: usertemp.height,
                weight: usertemp.weight,
                regions: usertemp.region,
                aims: usertemp.trainaims,
                times: usertemp.traintimes,
                places: usertemp.trainplaces,
                level: usertemp.level,
                history:[]
             }
           }
        );

        res.json({"update":"succeed"});
    });
}

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

function removeinfo () {
    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("removeinfo correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");
        usersinfo.find({}).toArray(function (err, docs) {
            console.log(docs);
        });
        usersinfo.deleteMany({});
    });
}


exports.login = login;
exports.signin = signin;
exports.addinfo = addinfo;
exports.updateinfo = updateinfo;
exports.personal = personal;
exports.existaccount = existaccount;

removeinfo();










