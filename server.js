var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8089);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  console.log('connected');
  //socket.emit('move', { hello: 'world' });
  socket.on('move', function (data) {
    io.sockets.emit('mover' , {data : data});
    console.log('Emmiting');
    console.log(data);
    //console.log(data);
  });

socket.on('hit', function (data) {
    io.sockets.emit('gothit' , true);
    console.log('GOT HIT ');
    console.log(data);
    //console.log(data);
  });

});