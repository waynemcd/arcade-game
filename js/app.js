/*--------------- Enemies --------------- */


var speed;//enemy speed
var displayScore = document.getElementById('playerScore');

var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load image
	this.x = x;
	this.y = y;
	this.speed = 50;
	this.sprite = 'images/enemy-bug.png';
	this.width = 101;
	this.height = 171;
};

var enemy = new Enemy();
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// instantiate objects
var enemy1 = new Enemy(0,143,20);
var enemy2 = new Enemy(-900,224,10);
var enemy3 = new Enemy(-0,300,90);
var enemy4 = new Enemy(-230,143,20);
var enemy5 = new Enemy(-190,224,10);
//var enemy6 = new Enemy(-770,300,90);
//var enemy7 = new Enemy(-900,300,90);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

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
	this.score = 0;
};

player = new Player();

Player.prototype.update = function() {
	this.checkCollision(); //Check if an interaction took place
};

Player.prototype.scored = function() {
	this.score++;  // Increment score
	displayScore.innerHTML = this.score; //Update score onscreen
};

Player.prototype.reset = function() { //Initial player starting position
	this.x = 220;
	this.y = 380;
}

Player.prototype.checkCollision = function() { // Check if player touches enemy if so reset position
	for(var c = 0; c < allEnemies.length;c++) {
			if (this.x < allEnemies[c].x + 98  && this.x + 69  > allEnemies[c].x &&
				this.y < allEnemies[c].y + 76 && this.y + 20 > allEnemies[c].y) {
			// Collision detected, reset player to starting position
			this.reset();
		}	
	}
};


// Draw the enemy on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player movement
Player.prototype.handleInput = function(allowedKeys) {
	if(allowedKeys == 'left' && player.x > 20 ) { 			   // Determines how far left on screen player can travel
		this.x -= 40; 
		} else if(allowedKeys == 'right' && player.x < 420) {  // Determines how far right on screen player can travel
		this.x += 40; 
		} else if (allowedKeys == 'up' && player.y > 40) {      // Determines how far player can travel to the top
		this.y+= -40;
		} else if (allowedKeys == 'down' && player.y < 450) {  // Determines how far to the bottom player can go
		this.y+= 40; 
		}
		// If player reaches the water reset to starting position
		if(this.y === 60){
			this.reset();
			this.scored(); //Increment score
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
