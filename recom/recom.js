var resourceroot = 'http://127.0.0.1:3000/resource/'
var imgurlroot = 'gifimg';
var speechurlroot = 'speech';
var foodurlroot = 'foodimg'

var exercise = require('./exercise');

var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';

function getrandomnum(minnum, maxnum) {
    var range =  maxnum - minnum;   
    var rand = Math.random();   
    return(minnum + Math.round(rand * range));   
}

function finduserdata(userdata) {
    var result;
    var userid = userdata['uid']
    
}

function queryDataWithUserSetting(userdata) {

}

exports.exercise = function(req, res) {
    var userdata = req.body;

    console.log(userdata);
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
                    var len = data['regions'].length;
                    if (len == 0) {
                        userdata['region'] = 'all';
                    } else {
                        var rid = getrandomnum(0, len-1);
                        userdata['region'] = data['regions'][rid];

                        console.log(rid);
                    }
                }

                if (!userdata['place']) {
                    var len = data['places'].length;
                    if (len == 0) {
                        userdata['place'] = 'home';
                    } else {
                        var rid = getrandomnum(0, len-1);
                        userdata['place'] = data['places'][rid];

                        console.log(rid);
                    }
                }

                if (!userdata['time']) {
                    var len = data['times'].length;
                    if (len == 0) {
                        userdata['time'] = '10';
                    } else {
                        var rid = getrandomnum(0, len-1);
                        userdata['time'] = data['times'][rid];

                        console.log(rid);
                    }
                }

                userdata['level'] = data['level'];

                // console.log(userdata);

                var actions = exercise.queryExerRecom(userdata);
                var count = actions.length;

                var result = {};
                result['len'] = count;
                result['actions'] = actions;

                res.json(result);

            } else {
                return;
            }
        });
    });
};

exports.food = function(req, res) {
    var userdata = req.body;

    res.json({
        'maindish':[
            {
                'img':resourceroot + foodurlroot + '?fid=f0.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {
                'img':resourceroot + foodurlroot + '?fid=f1.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {                
                'img':resourceroot + foodurlroot + '?fid=f2.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'}
        ],
        'vegetable':[
            {
                'img':resourceroot + foodurlroot + '?fid=f3.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {
                'img':resourceroot + foodurlroot + '?fid=f4.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {                
                'img':resourceroot + foodurlroot + '?fid=f5.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'}
        ],
        'meat':[
            {
                'img':resourceroot + foodurlroot + '?fid=f6.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {
                'img':resourceroot + foodurlroot + '?fid=f7.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {                
                'img':resourceroot + foodurlroot + '?fid=f8.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'}
        ],
        'fruit':[
            {
                'img':resourceroot + foodurlroot + '?fid=f0.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {
                'img':resourceroot + foodurlroot + '?fid=f1.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {                
                'img':resourceroot + foodurlroot + '?fid=f2.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'}
        ],
        'nuts':[
            {
                'img':resourceroot + foodurlroot + '?fid=f0.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {
                'img':resourceroot + foodurlroot + '?fid=f1.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'
            },
            {                
                'img':resourceroot + foodurlroot + '?fid=f2.jpeg',
                'fname':'莴笋',
                'calorie':'46Kcal/100g',
                'recomuse':'100g'}
        ]
    });
}



