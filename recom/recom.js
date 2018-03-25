var resourceroot = 'http://120.77.42.160:3000/resource/'
var imgurlroot = 'actionimg';
var speechurlroot = 'speech';
var foodurlroot = 'foodimg'

var exercise = require('./exercise');
var food = require('./food');

var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';

function getrandomnum(minnum, maxnum) {
    var range =  maxnum - minnum;   
    var rand = Math.random();   
    return(minnum + Math.round(rand * range));   
}

exports.exercise = function(req, res) {
    var userdata = req.body;

    var userid = userdata['uid'];

    if (!userid) {
        return;
    }

    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("Finduserdata Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({uid:userid}).toArray(function(err, docs){
            if (docs.length > 0) {
                var data = docs[0];

                if (!userdata['region']) {
                    var len;
                    if (data['region']) {
                        len = data['regions'].length;
                    } else {
                        len = 0;
                    }

                    if (len == 0) {
                        userdata['region'] = 'all';
                    } else {
                        var rid = getrandomnum(0, len-1);
                        userdata['region'] = data['regions'][rid];
                    }
                }

                if (!userdata['place']) {
                    var len;
                    if (data['place']) {
                        len = data['place'].length;
                    } else {
                        len = 0;
                    }
                    if (len == 0) {
                        userdata['place'] = 'home';
                    } else {
                        var rid = getrandomnum(0, len-1);
                        userdata['place'] = data['places'][rid];
                    }
                }

                if (!userdata['time']) {
                    var len;
                    if (data['time']) {
                        len = data['time'].length;
                    } else {
                        len = 0;
                    }
                    if (len == 0) {
                        userdata['time'] = '10';
                    } else {
                        var rid = getrandomnum(0, len-1);
                        userdata['time'] = data['times'][rid];
                    }
                }

                if (data['level']) {
                    userdata['level'] = data['level'];
                } else {
                    userdata['level'] = 'S';
                }

                var actions = exercise.queryExerRecom(userdata);

                var count = actions.length;

                var result = {};
                result['len'] = count;
                result['actions'] = actions;
// console.log('got recommendation data:', result);
                res.json(result);

            } else {
                return;
            }
        });
    });
};

function requirefood(req, res) {
    var userdata = req.body;

    result = food.queryFoodRecom();

    for (var i = 0; i < result.length; ++i) {
        for (var j = 0; j < result[i]['foods'].length; ++j) {
            result[i]['foods'][j]['img'] = resourceroot + foodurlroot + '?fid=' + result[i]['foods'][j]['id'] + '.png';
        }
    }

    res.json(result);
}

exports.food = requirefood;
