var python = require('python.js');

var sys = python.import('sys');
var os = python.import('os');

var gifurlroot = 'http://120.77.42.160:3000/resource/gifimg'

if (typeof(__dirname) != 'undefined')
    sys.path.append(__dirname);
else
    sys.path.append(os.path.join(os.getcwd(), 'node_modules/python.js/test'));

var pyrecom = python.import('recomExercise');

function tep() {
    var x = 1;
    return x;
}

function queryRecomActionSet(userdata) {
    var data = {};
    data['uid'] = userdata['uid'];
    data['level'] = userdata['level'];
    data['region'] = userdata['region'];
    data['place'] = userdata['place'];
    data['time'] = userdata['time'];

    var temp = pyrecom.queryRecomActions(data);
    var result = eval(temp);
    // console.log(result);

    var rlen = result.length;
    for (var i = 0; i < rlen; ++i) {
        // result[i]['gifimg'] = gifurlroot + '?gid=' + result['uid'] + '.gif';
        result[i]['gifurl'] = 'http://qq.yh31.com/tp/zjbq/201803152110104016.gif';
    }

    console.log(result);

    return result;
}

exports.queryExerRecom = queryRecomActionSet;

//queryRecomActionSet({'uid':'001','level':'SS','region':'back','calorie':'100','place':'home','goal':'strongmuscle','time':'600','instrument':'no'});