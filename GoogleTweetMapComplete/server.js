var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);



app.get('/', function (req, res) {
    console.log(req.headers);
    res.sendFile(__dirname + '/Public/Mymaps.html');
});
app.use(express.static(__dirname + '/Public'));

require("./request.js")(app);
server.listen(8081);