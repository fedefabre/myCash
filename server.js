var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

app.use(morgan('dev'));

app.use(express.static(__dirname + '/app'));

app.get('/userList', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/common/userList.json'));
});

app.get('/singleUser', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/common/singleUser.json'));
});

app.get('/fusioncharts/:file', function (req, res) {
    var file = req.params.file;
    res.sendFile(path.join(__dirname + '/node_modules/fusioncharts/'+file));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8081);
console.log('myCash is running on 8081');