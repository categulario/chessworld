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
		socket.on('add', this.socket.add.bind(this));
		socket.on('remove', this.socket.remove.bind(this));

		// Draw grid in canvas
		this.drawGrid();
	};

	// Default vars
	snakeWorld.prototype.vars = {
		'grid': {
			'width': 100,
			'height': 50
		},
		'snakes': {},
		'self': {
			x: 0,
			y: 0,
		}
	};

	// Event bindings for socket io
	snakeWorld.prototype.socket = {
		log: function( data ) {
			console.log( '[SOCKET LOG]', data );
		},
		snake: function(data) {
			this.drawPoint(data.x, data.y, 'green');
		},
		add: function(data) {
			this.vars.snakes[ data.id ] = data;
			this.drawPoint(data.x, data.y, '#343434');
		},
		remove: function(id) {
			var data = this.vars.snakes[id];
			this.removePoint(data.x, data.y);
			delete this.vars.snakes[id];
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

	snakeWorld.prototype.drawPoint = function(x, y, color) {

		// adjust
		// @TODO: make this dinamic
		x += 50;
		y += 25;
		color = color || '#343434';

		var ctx = this.vars.context,
		    pixelWidth = this.vars.canvas.width / this.vars.grid.width,
		    pixelHeight = this.vars.canvas.height / this.vars.grid.height;

		ctx.beginPath()
		ctx.rect(x*pixelWidth, y*pixelHeight, pixelWidth, pixelHeight);
		ctx.fillStyle = color;
		ctx.fill();

	}

	snakeWorld.prototype.removePoint = function(x, y) {

		// adjust
		// @TODO: make this dinamic
		x += 50;
		y += 25;
		var color = '#ffffff';

		var ctx = this.vars.context,
		    pixelWidth = this.vars.canvas.width / this.vars.grid.width,
		    pixelHeight = this.vars.canvas.height / this.vars.grid.height;

		ctx.beginPath()
		ctx.rect(x*pixelWidth, y*pixelHeight, pixelWidth, pixelHeight);
		ctx.fillStyle = color;
		ctx.fill();
	}

	snakeWorld.prototype.moveLeft = function() {
		this.vars.
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

	$(document).keydown(function(e) {
		var key = e.which;

		if(key == "37"){
			snakeWorld.moveLeft();
		} else if(key == "38") {
			snakeWorld.moveUp();
		} else if(key == "39") {
			snakeWorld.moveRight();
		} else if(key == "40") {
			snakeWorld.moveDown();
		} else if(key == '32') {
			// spacebar
		}
		//The snake is now keyboard controllable
	});
});