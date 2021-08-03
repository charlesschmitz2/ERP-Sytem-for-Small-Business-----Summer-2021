const http = require('http');

const server = http.createServer(function (req, res) {
  req.on('data', function (data) {
    //handle data as it is received... for POST requests
  });
  req.on('end', function () {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, 'OK');

    res.end('{ "data": "just a plain old json reply" }');
  });
});

server.listen(3000, (err) => {
  if (err) {
    console.log('bad things');
    return;
  }
  console.log('listening on port 3000');
});