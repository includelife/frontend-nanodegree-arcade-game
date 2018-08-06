// Enemies object, properties include position(x, y) and speed;
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //update the enemys position, only update postion of x;
    this.x = this.x + this.speed * dt;
    //if beyond the screen, reset the position.
    if (this.x > 606) {
      this.x = - 171;
    }
    //collision check, if player collision with enemys, reset to the start position.
    if (player.x < this.x + 60 && player.x > this.x - 50 && player.y > this.y - 40 && player.y < this.y + 70) {
      player.x = 202;
      player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//loaded Player's images, properties include position(x, y)
var Player = function(x, y) {
    this.spirte = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

//wining check, if up to the water, reset the player position, increase the start speed.
Player.prototype.update = function() {
  if (this.y < 68) {
    this.x = 202;
    this.y = 400;
    //increase the enemys speed
    for (var i = 0; i < allEnemies.length; i++) {
      allEnemies[i].speed += 50;
    }
  }
}

//operate the player move, insure the player not out of the screen.
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.x = (this.x - 101) < 0 ? this.x : this.x - 101;
            break;
        case 'up':
            this.y = (this.y - 83) < -15 ? this.y : this.y - 83;
            break;
        case 'right':
            this.x = (this.x + 101) > 404 ? this.x : this.x + 101;
            break;
        case 'down':
            this.y = (this.y + 83) > 400 ? this.y : this.y + 83;
            break;
    }
}

//Draw the Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.spirte), this.x, this.y);
}

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPY = [62, 143, 230];
for (var i = 0; i < 3; i++) {
  speed = 30 * Math.floor(Math.random() * 10 + 1);
  allEnemies.push(new Enemy(0, enemyPY[i], speed));
}
var player = new Player(202,400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
