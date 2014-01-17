(function() {

	"use strict";

	window.snakeWorld = function( _canvas ) {
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
		socket.on('move', this.socket.move.bind(this));

		// Draw grid in canvas
		this.drawGrid();
	};

	// Default vars
	snakeWorld.prototype.vars = {
		'id': 0,
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
		snake: function(data) { // self
			this.vars.id = data.id;
			this.vars.self.x = data.x;
			this.vars.self.y = data.y;
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
		},
		move: function(data) {
			this.removePoint(this.vars.snakes[data.id].x, this.vars.snakes[data.id].y);
			this.vars.snakes[data.id].x += data.x;
			this.vars.snakes[data.id].y += data.y;
			this.drawPoint(this.vars.snakes[data.id].x, this.vars.snakes[data.id].y);
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

	snakeWorld.prototype.move = function(x, y) {
		this.vars.socket.emit('move', {
			id: this.vars.id,
			x: x,
			y: y,
		});
		this.removePoint(this.vars.self.x, this.vars.self.y);
		this.vars.self.x += x;
		this.vars.self.y += y;
		this.drawPoint(this.vars.self.x, this.vars.self.y, 'green');
	}

})();

$(function(){
	/**
	 * set the canvas with and height
	 */
	var width = $(window).width();
	var height = $(window).height();

	$('#canvas').attr('width', width);
	$('#canvas').attr('height', height);

	window. SW = new snakeWorld( $('#canvas')[0] );

	$(document).keydown(function(e) {
		var key = e.which;

		if(key == "37"){
			SW.move(-1, 0);
		} else if(key == "38") {
			SW.move(0, -1);
		} else if(key == "39") {
			SW.move(1, 0);
		} else if(key == "40") {
			SW.move(0, 1);
		} else if(key == '32') {
			// spacebar
		}
		//The snake is now keyboard controllable
	});
});