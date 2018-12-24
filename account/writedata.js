var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';


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

function removeinfo (uname) {
    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("removeinfo correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uid:username}).toArray(function (err, docs) {
            console.log(docs);
        });
        usersinfo.deleteMany({});
    });
}

exports.addinfo = addinfo;
exports.updateinfo = updateinfo;