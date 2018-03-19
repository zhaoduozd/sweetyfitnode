
var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27521/sweetyfitnode';

var uid = 'dora';
var pwd = '111';
var userdata = new Array();
userdata['uid'] = uid;
userdata['pwd'] = pwd;
userdata['history'] = new Array();

console.log(typeof userdata);

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Sign In Connected correctly to server");

    const db = client.db("tests");
    const usersinfo = db.collection("usersInfo");

    usersinfo.find({uid:userdata.uid}).toArray(function(err, docs) {
        assert.equal(err, null);  
        if (docs.length > 0) {
           //res.json({'signin':'fail', 'reason':'repeat username'});
        } else {
        	console.log(docs);
            usersinfo.insertOne(userdata)
            .then(function(){
                console.log('insert succeed');
            });
        }

        updatehistory();
    });
});

function updatehistory() {
    var uname = uid;
    var calorie = 1000;
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("updatahistory Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uid:uname}).toArray(function(err, docs) {
            assert.equal(err, null); 
            console.log(docs);
            if (docs.length > 0) {
                var ehistory = docs[0]['history'];
                var currenttime = new Date();
                var record = new Array();

                var curyear = currenttime.getFullYear()+'';
                var curMonth = currenttime.getMonth()+1;
                var curDate = currenttime.getDate();

                if (curMonth < 10) {
                    curMonth = '0' + curMonth;
                }

                if (curDate < 10) {
                    curDate = '0' + curDate;
                }

                var today = curyear + curMonth + curDate;

                record['calorie'] = calorie;
                record['date'] = today;
                ehistory.push(record);

                JSON.stringify(ehistory);

                usersinfo.update(
                   {uid:uname},
                   {
                     $set: {
                        history:ehistory
                     }
                   }
                );

                //res.json({'acceptable':'YES'});
            } else {
                //res.json({'acceptable':'NO'});
            }
        });
    });
}
