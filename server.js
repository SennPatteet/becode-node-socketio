const express = require('express');
const app = express();

const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const nodemon = require('nodemon');

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.set('view engine', 'ejs');

app.use(express.static('public'));


// ROUTES -------------------------------------------------------

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
