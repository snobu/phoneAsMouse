/* global __dirname */
/* global process */
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
import * as handler from './js/handler.js';
import * as _ from 'underscore.js';


var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

var connectedSenders = {};
var connectedReceivers = {};


io.on('connection', function (socket) {

  socket.on('login', async(data, callback) => {
    var error = null;
    var response = null;
    console.log('am primit login de la client. ' + JSON.stringify(data));

    var connectionId = data.connectionId;

    //mouse a.k.a phone
    if(data.clientType === "sender") {
      connectedSenders[connectionId] = socket;
    }

    //pc
     if(data.clientType === "receiver") {
      connectedReceivers[connectionId] = socket;
    }


    callback(error, response);
  });

  socket.on('mouseMove', async(data, callback) => {
    var connectionId = null;
    var error = null;
    var response = null;

    _.each(connectedSenders, function (value, key) {
      if (value == socket) {
        connectionId = key;
      }
    });

    if(connectionId) {
      var pcSocket = connectedReceivers[connectionId];
      if (pcSocket != null) {
        pcSocket.emit('mouseMove', data, function (error, callback) {

        });
      } else {
        error = 'PC not found';
        console.error(error);
      }

    } else {
      error = 'Phone not found';
      console.error(error);
    }
    callback(error, response);
  });


  socket.on('disconnect', function () {
    console.log('disconnected socket: ' + socket.id);
    if (connectedSenders[socket.id]) {
      delete connectedSenders[socket.id];
    }

    if (connectedReceivers[socket.id]) {
      delete connectedReceivers[socket.id];
    }

  });

});
