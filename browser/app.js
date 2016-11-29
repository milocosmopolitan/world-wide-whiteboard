console.log(window.location)


var socket = window.location.pathname !== '/' ? io(window.location.origin) : io(window.location.pathname);

var socket = io(window.location.pathname);
	socket.on('connect', function(){
		console.log('turing connect');
		socket.on('draw', function(...payload) {

			console.log('drawing broadcast')
			whiteboard.draw(...payload);
		})
	})

	whiteboard.on('draw', function(...payload){
		console.log(...payload);
		socket.emit('draw', ...payload);
	})

	socket.on('draw', function(...payload) {	
		whiteboard.draw(...payload);
		console.log('drawing broadcast')	
	})	

	socket.on('restore', function(payload) {
		console.log('restore');
		whiteboard.draw(payload[0], payload[1], payload[2]);
		
	})
