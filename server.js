var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

//var allClients = [];

var drawing = []

io.on('connection', function (socket) {
    console.log('A new client has connected!');
    console.log(socket);    

    drawing.forEach(data=>{
    	console.log('data', data)

    	// console.log('start', data)
    	// console.log('end', data[1])
    	// console.log('stroke', data[2])
    	socket.emit('restore', data);
    })
    
    
    socket.on('disconnect', function() {
    	// var i = allClients.indexOf(socket);
     //  	delete allClients[i];      	
    	console.log('user disconnected');            
   });

    socket.on('draw', function(...data){
    	let payload = data;
    	drawing.push(payload);
    	socket.broadcast.emit('draw', ...data);    	
    })
});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});