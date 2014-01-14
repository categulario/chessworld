(function(){

	var server = require('socket.io').listen(8080),
<<<<<<< HEAD
			clients = [];
=======
		clients = [];
>>>>>>> 66064fdab1e8789d9a6ffb02fa73247f68eee3a6

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

		// start at some point of 200x200 matrix
		client.snake = {
<<<<<<< HEAD
			x: Math.floor(Math.random()*10),
			y: Math.floor(Math.random()*10)
=======
			x: Math.floor(Math.random()*200-100),
			y: Math.floor(Math.random()*200-100)
>>>>>>> 66064fdab1e8789d9a6ffb02fa73247f68eee3a6
		}

		client.socket.emit('init', client.snake);
	}

})();