(function() {

	"use strict";

	var snakeWorld = function( el ) {

		// Init socket :)
		var socket = this.vars.socket = io.connect('http://127.0.0.1:8080');

		socket.on( 'log', this.socket.log.bind(this) );
		socket.on( 'init', this.socket.init.bind(this) );

		// Init canvas
		var $canvas = this.$canvas = $(el),
		    context = $canvas[0].getContext('2d');

	};

	// Default vars
	snakeWorld.prototype.vars = {
		screen: {
			width: 10,
			height: 10
		}
	};

	// Event bindings for socket io
	snakeWorld.prototype.socket = {};

	snakeWorld.prototype.socket.log = function( data ) {
		console.log( '[SOCKET LOG]', data );
	}

	snakeWorld.prototype.socket.init = function( client_id, coord ) {

	}

	window.snakeWorld = snakeWorld;

})();

$(document).ready(function(){
	new snakeWorld( '#canvas' );
});