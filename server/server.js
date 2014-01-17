(function(){
	var server = require('socket.io').listen(8080),
		online = {
			clients: {},
			inc_id: 0,
			online: 0
		};

	server.sockets.on('connection', function(socket) {

		// Add player and initialize positions
		var client_id = online.inc_id;

		online.clients[client_id] = {
			snake: {},
			socket: socket,
		};

		online.inc_id++, online.online++;

		addPlayer(client_id);


		// Handle disconnect event
		socket.on('disconnect', function() {
			delete online.clients[client_id];
			online.online--;
			console.log("   \033[31msnake\033[0m - " + 'client ' + client_id + ' disconnect, ' + online.online + ' online');

			// Send broadcast
			for(var i in online.clients)
				if(i != client_id)
					online.clients[i].socket.emit('remove', client_id);

		});

		socket.on('move', function(data) {
			console.log(data);
		});

		// Advices
		console.log("   \033[31msnake\033[0m - " + 'client ' + client_id + ' connected, ' + online.online + ' online');
		socket.emit('log', 'fully initialized :) - good luck');

		// Send broadcast
		for(var i in online.clients) {
			if(i != client_id) {
				online.clients[i].socket.emit('add', online.clients[ client_id ].snake);
				socket.emit('add', online.clients[ i ].snake);
			}
		}

	});

	/*
	* addPlayer
	* ~ Initializes a client's snake
	*/

	function addPlayer(client_id) {
		var client = online.clients[client_id];

		// start at some point of 100x50 matrix
		client.snake = {
			id: client_id,
			x: Math.floor(Math.random()*100-50),
			y: Math.floor(Math.random()*50-25)
		}

		client.socket.emit('snake', client.snake);
	}

})();