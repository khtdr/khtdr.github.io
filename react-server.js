
const fs = require('fs')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

fs.watch(__dirname, { recursive:true }, (event, name) => {
  if (name.match(/^(\.|node_modules)/)) return;
  io.emit('reload');
});

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();
});

app.get([/\/$/, /.*\.html$/], function (req, res) {
  let filename = __dirname + req.path;
  filename += filename.endsWith('/')? 'index.html': '';
  fs.readFile(filename, function (err, data) {
    res.send(
      `${data}
      <script src="/node_modules/socket.io-client/dist/socket.io.js">
      </script>
      <script>
        (function () {
          var socket = io()
          var reloading = false
          socket.on('reload', function () {
            if (!reloading) {
              reloading = true
              setTimeout(function () {
                window.location.reload()
              }, 1000)
            }
          })
        })()
      </script>`
    )
  });
});

app.use(express.static(__dirname));

http.listen(process.env.PORT || 8080, function () {
  console.log('#> http://localhost:' + (process.env.PORT || 8080) + '/');
});

