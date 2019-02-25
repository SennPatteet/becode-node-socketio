const express = require('express');
const app = express();

const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const nodemon = require('nodemon');

users = [];
connections = []

server.listen(process.env.PORT || 3000);
console.log('Server running...');


// ROUTES -------------------------------------------------------

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
