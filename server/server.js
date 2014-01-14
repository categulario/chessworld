(function(){

	var server = require('socket.io').listen(8080),
			clients = [];

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

	function addPlayer(client_id) {
		var client = clients[client_id];

		// start at some point of 100x100 matrix
		client.snake = {
			x: Math.floor(Math.random()*10),
			y: Math.floor(Math.random()*10)
		}

		client.socket.emit('init', client.snake);
	}

})();