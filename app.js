let http = require('http');
let fs = require('fs');

let server = http.createServer(function(req, res) {

    fs.readFile('views/chat.html', 'utf-8', function(error, content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    });
});

let io = require('socket.io').listen(server);

io.on('connection', function(socket){

  socket.on('newPseudo', function(pseudo) {
    socket.pseudo = pseudo;
  });

  socket.on('message', function(message) {
    socket.emit('message', socket.pseudo, message)
    socket.broadcast.emit('message', socket.pseudo, message)
  });

});

server.listen(8080);