(function() {

	"use strict";

	var snakeWorld = function( el ) {

		// Init socket :)
		var socket = this.vars.socket = io.connect('http://127.0.0.1:8080');

		socket.on( 'log', this.socket.log.bind(this) );

	};

	// Default vars
	snakeWorld.prototype.vars = {};

	// Event bindings for socket io
	snakeWorld.prototype.socket = {};

	snakeWorld.prototype.socket.log = function( data ) {
		console.log( '[SOCKET LOG]', data );
	}

	window.snakeWorld = snakeWorld;

})();

$(document).ready(function(){
	new snakeWorld( '#canvas' );
});