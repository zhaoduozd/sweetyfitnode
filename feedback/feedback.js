var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';

exports.exerciserecord = function(req, res) {
    var uname = req.query.u;
    var calorie = req.query.c;

    var currenttime = new Date();
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

    var record = {'Calorie':calorie, 'Date':today};

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("updatehistory Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.updateOne(
            {uid:uname},
            {$push:
                {history: record}
            }
        );
        res.json({'status':'succeed'});
    });
};


