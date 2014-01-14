(function() {

	"use strict";

	var snakeWorld = function( canvas ) {

		// Get context and specify canvas vars
		var $canvas = this.vars.$canvas = $(canvas);

		if( !$canvas.length ) {
			console.log($canvas);
			throw "Canvas not found";
			return;
		}

		canvas = this.vars.canvas = $canvas[0];
		this.vars.context = canvas.getContext('2d');

		// Init socket and bind event listeners
		var socket = this.vars.socket = io.connect('http://127.0.0.1:8080');

		socket.on('log', this.socket.log.bind(this));
		socket.on('snake', this.socket.snake.bind(this));


		// Draw grid in canvas
		this.drawGrid();

	};

	// Default vars
	snakeWorld.prototype.vars = {
		'grid': {
			'width': 100,
			'height': 50
		}
	};

	// Event bindings for socket io
	snakeWorld.prototype.socket = {
		log: function( data ) {
			console.log( '[SOCKET LOG]', data );
		},
		snake: function(data) {
			console.log(data);
		}
	};

	// Grid functions
	snakeWorld.prototype.drawGrid = function() {

		var it = 0,
		    ctx = this.vars.context,
		    pixelWidth = this.vars.canvas.width / this.vars.grid.width,
		    pixelHeight = this.vars.canvas.height / this.vars.grid.height;

		ctx.strokeStyle = '#cccccc';

		for( it=0; it<=this.vars.grid.width; it++ ) {
			ctx.beginPath();
			ctx.moveTo( it * pixelWidth, 0 );
			ctx.lineTo( it * pixelWidth, this.vars.canvas.height );
			ctx.stroke();
		}

		for( it=0; it<=this.vars.grid.height; it++ ) {
			ctx.beginPath();
			ctx.moveTo( 0, it * pixelHeight, 0 );
			ctx.lineTo( this.vars.canvas.width, it * pixelHeight );
			ctx.stroke();
		}

	}

	window.snakeWorld = snakeWorld;

})();

$(function(){
	new snakeWorld( '#canvas' );
});