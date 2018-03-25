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
                result = [];
                personalinfo = {};
                exerciseAdvice = {
                    'Advice':'由于您的体脂率偏高，SweetyFit建议您增加有氧运动的训练，如慢跑，快走，游泳等。同时，配合适当的力量训练。请注意运动后要充分拉伸肌肉，以免造成肌肉的不适感',
                    'Data':[
                        {
                            'Type':['有氧运动','力量训练','拉伸运动','其他'],
                            'Data':['0.5','0.2','0.25','0.05']
                        }
                    ]
                };
                dietAdvice = {
                    'Advice':'',
                    'Data':[
                        {
                            'Type':['碳水化物类','蛋白质类','维生素类','脂肪类','纤维素类','其他'],
                            'Data':['0.2','0.4','0.1','0.05','0.2','0.05']
                        }
                    ]
                }
                personalinfo['history'] = user['history'];
                personalinfo['level'] = user['level'];
                personalinfo['exerciseAdvice'] = exerciseAdvice;
                personalinfo['dietAdvice'] = dietAdvice;
                res.json(personalinfo);
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

// removeinfo();










