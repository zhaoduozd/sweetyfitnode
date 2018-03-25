var python = require('python.js');

var sys = python.import('sys');
var os = python.import('os');

if (typeof(__dirname) != 'undefined')
    sys.path.append(__dirname);
else
    sys.path.append(os.path.join(os.getcwd(), 'node_modules/python.js/test'));

var pydata = python.import('RequireData');


function uiexercsie(req, res) {
    var actionsets = pydata.requireActions();
    var result = eval(actionsets);
    res.json(result);
}

function uifood(req, res) {
    var foodsets = pydata.requireFoods();
    var result = eval(foodsets);
    res.json(result);
}

exports.uiexercise = uiexercsie;
exports.uifood = uifood;