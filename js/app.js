/*--------------- Enemies --------------- */


var speed;//enemy speed
var score = 0;

var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load image
	this.x = x;
	this.y = y;
	this.speed = 100;
	this.sprite = 'images/enemy-bug.png';
	this.width = 101;
	this.height = 171;
};

var enemy = new Enemy();
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// instantiate objects
var enemy1 = new Enemy(0,58,20);
var enemy2 = new Enemy(-100,143,10);
var enemy3 = new Enemy(-300,224,90);
var allEnemies = [enemy1, enemy2, enemy3];

Enemy.prototype.update = function(dt) {
    // Multiply movement by the dt parameter
    // to ensure the game runs at the same speed on all computers.
	this.x = this.x + this.speed * dt;
		if (this.x > 521){ // Once the enemy reaches the end of the screen, 
			this.x = 0;	   // restart at initial position
		}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*--------------- Player --------------- */


// player class
var Player = function() {
	this.sprite = 'images/char-boy.png';
	//Initial player starting position
	this.reset = function() {
		this.x = 200;
		this.y = 320;
	};
}

player = new Player();

Player.prototype.update = function() {
	
};

// Draw the enemy on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player movement
Player.prototype.handleInput = function(allowedKeys) {
	if(allowedKeys == 'left' && player.x > 0 ) { 			   // Determines how far left on screen player can travel
		this.x -= 20; 
		} else if(allowedKeys == 'right' && player.x < 420) {  // Determines how far right on screen player can travel
		this.x += 20; 
		} else if (allowedKeys == 'up' && player.y > 0) {      // Determines how far player can travel to the top
		this.y+= -20;
		} else if (allowedKeys == 'down' && player.y < 400) {  // Determines how far to the bottom player can go
		this.y+= 20; 
		}
		// If player reaches the water reset to starting position
		if(player.y === 0){
			player.reset();
			score++; //Increment score
		}
};

player.reset(); //Place player at starting position

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
