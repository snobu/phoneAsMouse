/* global __dirname */
/* global process */
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
import * as handler from './js/handler.js';


var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

// usernames which are currently connected to the chat
var usernames = {};
var connectedUsers = {};
var numUsers = 0;

io.on('connection', function (socket) {

  socket.on('login', async(data, callback) => {
    var error = null;
    var response = null;
    console.log('am primit login de la client. ' + JSON.stringify(data));



    callback(error, response);
  });


  socket.on('disconnect', function () {
    console.log('disconnected socket: ' + socket.id);
    delete connectedUsers[socket.id];
  });

});
