(function(){

	var server = require('socket.io').listen(8080),
			clients = [];

	console.log("HERE");

	server.sockets.on('connection', function(socket) {
		var client_id = clients.length;

		clients.push({
			snake: {},
			socket: socket,
		});

		socket.emit('log', 'connected');

		addPlayer(client_id);
	});

	/*
	* addPlayer
	* ~ Initializes a client's snake
	*/
	console.log("HERE");

	function addPlayer(client_id) {
		var client = clients[client_id];

		// start at some point of 100x100 matrix
		client.snake = {
			x: Math.random(0, 100),
			y: Math.random(0, 100)
		}

		client.socket.emit('snake', client.snake);
	}
	console.log("HERE");

})();