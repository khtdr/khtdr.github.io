
var fs      = require('fs');
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

fs.watch(__dirname, function (filename) {
  io.emit('file-change', { for: 'everyone' });
});

app.get('/socket-io.js', function (req, res) {
  fs.readFile(__dirname + '/node_modules/socket.io-client/socket.io.js',
              function (err, data) {
                res.send(data);
              });
});

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();
});

app.get([/\/$/, /.*\.html$/], function (req, res) {
  var filename = __dirname + req.path;
  filename += filename.endsWith('/')? 'index.html': '';
  fs.readFile(filename, function (err, data) {
    res.send(data
            + '<script src="/socket-io.js"></script>'
            + '<script>'
            + '  var socket = io();'
            + '  socket.on("file-change", function () {'
            + '    window.location.reload();'
            + '  });'
            + '</script>'
            );
  });
});

app.use(express.static(__dirname));

http.listen(process.env.PORT || 8080, function () {
  console.log('#> http://localhost:' + (process.env.PORT || 8080) + '/');
});



