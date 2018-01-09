var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.sendFile('/Users/duozhao/Documents/FinalYearProject/FitNode/test.gif');
})

app.listen(3000);
