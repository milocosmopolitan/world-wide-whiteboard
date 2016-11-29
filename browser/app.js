console.log(window.location)




if(window.location.pathname !== '/'){
	var turing = io(window.location.pathname);
	turing.on('connect', function(){
		console.log('turing connect');
		turing.on('draw', function(...payload) {

			console.log('drawing broadcast')
			whiteboard.draw(...payload);
		})
	})

	whiteboard.on('draw', function(...payload){
		console.log(...payload);
		turing.emit('draw', ...payload);
	})

	turing.on('draw', function(...payload) {	
		whiteboard.draw(...payload);
		console.log('drawing broadcast')	
	})	

	turing.on('restore', function(payload) {
		console.log('restore');
		whiteboard.draw(payload[0], payload[1], payload[2]);
		
	})
} else {
	var socket = io(window.location.origin);
	socket.on('connect', function(){
		console.log('made a persistent tow-way connection to server');
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
		console.log(payload);
		whiteboard.draw(payload[0], payload[1], payload[2]);
		
	})
}


//var turing = io('/turing');




// setTimeout(function(){
// 	socket.disconnect();
// }, 3000);

// socket.on("disconnect", function(){
// 	console.log('disconnected');
// });

whiteboard.on('draw', function(...payload){
	console.log(...payload);
	socket.emit('draw', ...payload);
})


// socket.on('restore', function(payload) {

// 	console.log('restore');
// 	console.log(payload);
// 	whiteboard.draw(payload[0], payload[1], payload[2]);
	
// })

// socket.on('draw', function(...payload) {	
// 	whiteboard.draw(...payload);
// 	console.log('drawing broadcast')	
// })