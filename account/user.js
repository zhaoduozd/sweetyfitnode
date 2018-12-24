var account = require('./account');
var personal = require('./personal');
var writedata = require('./writedata');

exports.login = account.login;
exports.signin = account.signin;
exports.existaccount = account.existaccount;

exports.addinfo = writedata.addinfo;
exports.updateinfo = writedata.updateinfo;

exports.personal = personal.personal;