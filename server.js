var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

var clients = {
	all: [],
	turing: []
};

var drawing = {
	default: [],
	turing: [],
	grace: [],
	kitchen: []
}


var turing = io.of('/turing');



io.on('connection', function (socket) {
    console.log('A new client has connected!');


    console.log('nsp',socket.nsp);
    clients.all.push(socket);

    if(clients.all.length > 1) {
    	console.log('/Drawing', drawing);
    	drawing.default.forEach(data=>{	    	
	    	socket.emit('restore', data);
	    })
    }

    socket.on('disconnect', function() {
    	var i = clients.all.indexOf(socket);
      	delete clients.all[i];      	
    	console.log('user disconnected');            
   });

    socket.on('draw', function(...data){
    	let payload = data;
    	drawing.default.push(payload);
    	socket.broadcast.emit('draw', ...data);    	
    })
});

// turing.on('connection', function (socket) {
//     console.log('This is suppose to be turing');
//     //console.log(socket);    
//     clients.turing.push(socket);

//     if(clients.turing.length > 1) {
//     	console.log('/Turing Drawing', drawing);
//     	drawing.turing.forEach(data=>{	    	
// 	    	socket.emit('restore', data);
// 	    })
//     }

//     socket.on('disconnect', function() {
//     	var i = clients.turing.indexOf(socket);
//       	delete clients.turing[i];      	
//     	console.log('user disconnected');            
//    });

//     socket.on('draw', function(...data){    	
//     	console.log('turing drawing')
//     	let payload = data;
//     	drawing.turing.push(payload);

//     	//console.log(drawing);
//     	socket.broadcast.emit('draw', ...data);    	
//     })
// });


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/turing', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});




app.get('/grace', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/kitchen', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
