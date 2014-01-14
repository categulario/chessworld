(function() {

	"use strict";

	window.snakeWorld = function( el ) {

		// Init socket :)
		var socket = this.vars.socket = io.connect('http://127.0.0.1:8080');

		socket.on('log', this.socket.log.bind(this));
		socket.on('snake', this.socket.snake.bind(this));

	};

	// Default vars
	snakeWorld.prototype.vars = {};

	// Event bindings for socket io
	snakeWorld.prototype.socket = {
		log: function( data ) {
			console.log( '[SOCKET LOG]', data );
		},
		snake: function(data) {
			console.log(data);
		}
	};
})();

$(function(){
	new snakeWorld( '#canvas' );
});