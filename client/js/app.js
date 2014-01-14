(function() {

	"use strict";

	var snakeWorld = function( _canvas ) {
		if(! _canvas instanceof HTMLCanvasElement)
			throw new Error('Invalid element');

		// Get context and specify canvas vars
		this.vars.canvas = _canvas;

		var canvas = this.vars.canvas;
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
			this.drawPoint(data.x, data.y);
		}
	};

	// Canvas functions
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

	snakeWorld.prototype.drawPoint = function(x, y) {

		// adjust
		// @TODO: make this dinamic
		x += 50;
		y += 25;

		var ctx = this.vars.context,
		    pixelWidth = this.vars.canvas.width / this.vars.grid.width,
		    pixelHeight = this.vars.canvas.height / this.vars.grid.height;

		ctx.beginPath()
		ctx.rect(x*pixelWidth, y*pixelHeight, pixelWidth, pixelHeight);
		ctx.fillStyle = '#343434';
		ctx.fill();

	}

	window.snakeWorld = snakeWorld;

})();

$(function(){
	/**
	 * set the canvas with and height
	 */
	var width = $(window).width();
	var height = $(window).height();

	$('#canvas').attr('width', width);
	$('#canvas').attr('height', height);

	new snakeWorld( $('#canvas')[0] );
});