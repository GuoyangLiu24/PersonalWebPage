// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 600;
document.getElementById('gameboard').appendChild(canvas);

// Background image
var bgImage = new Image();
var bgReady = false;
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "./floor.jpg";
var bugImage = new Image();
var bugReady = false;
bugImage.onload = function () {
	bugReady = true;
};
bugImage.src = "./bug.png";

// Game objects
var bg = {
	width: 1024,
	height: 600
}

var bigbug = {
	x: Math.random() * bg.width / 2,
	y: Math.random() * bg.height / 2,
	interval: 5000,
	width: 100,
	height: 100,
};

var score = 0;
// handle keyboard controls

// Reset the game when the player catches a monster
var reset = function () {
	document.getElementById("score").innerText = 0;
	score = 0;
	bigbug.interval = 5000;
};

// Update game objects
var update = function () {
	//update bigbug location
	bigbug.x = Math.random() * bg.width;
	bigbug.y = Math.random() * bg.height;

	while(bigbug.x < 0 || bigbug.x > bg.width - bigbug.width || bigbug.y < 0 || bigbug.y > bg.height - bigbug.height) {
		bigbug.x = Math.random() * bg.width;
		bigbug.y = Math.random() * bg.height;
	}
};

var updatePlay = function (e) {
	//update after catch
	if (e.offsetX >= bigbug.x && e.offsetX <= (bigbug.x + bigbug.width) && e.offsetY >= bigbug.y && e.offsetY <= (bigbug.y + bigbug.height)) {
		if (bigbug.interval > 200) {
			bigbug.interval -= 200;
		}
		// movement in pixels per second
		bigbug.x = Math.random() * bg.width;
		bigbug.y = Math.random() * bg.height;

		while(bigbug.x < 0 || bigbug.x > bg.width - bigbug.width || bigbug.y < 0 || bigbug.y > bg.height - bigbug.height) {
			bigbug.x = Math.random() * bg.width;
			bigbug.y = Math.random() * bg.height;
		}

		//increase score 100
		score += 100;
		document.getElementById("score").innerText = score;
		then = Date.now();
	}
};

canvas.addEventListener("click", updatePlay, false);

var resetSpeed = document.getElementById("resetSpeed");
resetSpeed.addEventListener("click", function () {
	bigbug.interval = 5000;
});

var resetScore = document.getElementById("resetScore");
resetScore.addEventListener("click", reset, false);

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0, bg.width, bg.height);
	}
	if (bugReady) {
		ctx.drawImage(bugImage, bigbug.x, bigbug.y, bigbug.width, bigbug.height);
	}
}

// The main game loop
var main = function () {
	var now = Date.now();
	render();

	if (now - then > bigbug.interval) {
		update();
		render();
		// Request to do this again ASAP
		requestAnimationFrame(main);
		then = now;
	}
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// // Let's play this game!
var then = Date.now();
reset();
main();