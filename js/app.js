// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

    var enemySpeed = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // If the enemy has reached the rightmost edge,
    // return it to the far left to restart cycle
    if (this.x >= 800) {
        this.x = -100;
        this.y = Math.random() * 200;
    }
    checkCollision(this);
    reachGoal();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, xSpeed, ySpeed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
}

Player.prototype.update = function(dt) {
    keepInFrame(this);
    reachGoal();
    displayHeartLevel(heart, level);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.handleInput = function(keypress) {
    switch (keypress) {
        case 'left':
            player.x -= player.xSpeed;
            break;
        case 'up':
            player.y -= player.ySpeed;
            break;
        case 'right':
            player.x += player.xSpeed;
            break;
        case 'down':
            player.y += player.ySpeed;
            break;
    }
}

var Princess = function(x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
}

Princess.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Star = function(x, y) {
    this.sprite = 'images/Star2.png';
    this.x = x;
    this.y = y;
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var keepInFrame = function() {
    // Prevents player from traveling off screen
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 600) {
        player.x = 603;
    }
    if (player.x < 3) {
        player.x = 3;
    }
    if (player.y < 50) {
        player.y = 50;
    }
}

var checkCollision = function(anEnemy) {
    // If player comes too close to an enemy
    if (player.y + 81 >= anEnemy.y
        && player.x <= anEnemy.x + 50
        && player.y <= anEnemy.y + 35
        && player.x + 76 >= anEnemy.x + 11) {

        console.log('Oh no, there was a collision!');

        // If there is a collision, reduce score by 25
        if (score >= 25) {
            score -= 25;
        }
        // Return player to original position
        player.x = 303;
        player.y = 383;
    }
}

var displayHeartLevel = function(score, heart, level) {
    document.getElementById('scores').innerHTML = "<strong>Score:</strong> " + "<span style='font-size: 27.5px'>" + this.score + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.getElementById('hearts').innerHTML = "<img src='images/Heart3.png' style='height: 1.5em; vertical-align: middle'>" + " x " + "<span style='font-size: 27.5px'>" + this.heart + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.getElementById('levels').innerHTML = "<strong>On Path:</strong> " + "<span style='font-size: 27.5px'>" + this.level + "</span> <img src='images/enemy-bug2.png' style='vertical-align: middle; height: 1.5em'>";
}

var reachGoal = function() {
    if (player.y < 0) {   
        if (player.x === 303) {   
            player.x = 303;
            player.y = 383;
            console.log('You made it!');

            score += 50;
            for (var i = 1; i < 10; i++) {
                // If score equals a multiple of 100 or 
                // is within bounds (200 < x < 225 will earn a heart),
                // earn a heart
                if (score === 100*i || (score < (100*i + 26) && (score > (100*i)))) {
                    heart += 1;
                }
            }
            // If the player reaches or is within bounds of 1000, they have beaten the game!
            if (score === 1000 || (score < (1026) && (score > (1000)))) {
                window.alert("Congratulations! You have beaten the game. Don't forget to invite me to your wedding with the Princess!");
            }
            level += 1;
            console.log('Score: ' + score + ', Number of Hearts: ' + heart + ', Current Level: ' + level);
            addMoreEnemies();
        }
        else {
            player.y = 0;
        }
    }
}

var createEnemy = function() {
    return new Enemy(-100, Math.random() * 184 + 100, Math.random() * 256);
}

var addMoreEnemies = function() {
    allEnemies.push(new createEnemy());
}

var allEnemies = [];
var player = new Player(303, 383, 100, 85);
var star = new Star(297.5, -7.5);
var princess = new Princess(303, -25);
var enemy = createEnemy();
var score = 0;
var heart = 0;
var level = 1;

allEnemies.push(enemy);

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


