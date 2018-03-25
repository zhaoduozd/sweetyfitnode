var python = require('python.js');

var sys = python.import('sys');
var os = python.import('os');

var foodurlroot = 'http://120.77.42.160:3000/resource/foodimg'

if (typeof(__dirname) != 'undefined')
    sys.path.append(__dirname);
else
    sys.path.append(os.path.join(os.getcwd(), 'node_modules/python.js/test'));

var pyrecom = python.import('recomFood');

function queryRecomFoodSet() {
    // var data = {};
    // data['uid'] = userdata['uid'];
    // data['level'] = userdata['level'];
    // data['region'] = userdata['region'];
    // data['place'] = userdata['place'];
    // data['time'] = userdata['time'];

    var temp = pyrecom.requireFoods();
    var result = eval(temp);

    return result;
}

exports.queryFoodRecom = queryRecomFoodSet;

//queryRecomActionSet({'uid':'001','level':'SS','region':'back','calorie':'100','place':'home','goal':'strongmuscle','time':'600','instrument':'no'});