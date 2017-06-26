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
        this.y = Math.random() * 200 + 75; 
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

Player.prototype.update = function() {
    keepInFrame(this);
    displayHeartLevel(heart, level);
    reachGoal();
    console.log("player's x is at " + player.x + " and y is at " + player.y);


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

Princess.prototype.update = function() {

    if (this.x === -101) {
        this.x = -101 + randomizer(2, 8) * 101;
        star.x = princess.x - 5.5;
        console.log("princess is at " + princess.x);
        console.log("player is at " + player.x + " and princess is at " + princess.x);
        // if (this.x >= 0 && this.x <= 303) {
        //     this.x = 303 + randomizer(1, 3) * 101;
        // }
        // if (this.x >= 303 && this.x <= 606) {
        //     this.x = 303 - randomizer(1, 4) * 101;
        // }

        // if (princess.x === 101 || princess.x === 0) {
        //     princess.x = 303 + randomizer(1, 4) * 101;
        // }
        // if (princess.x === 202 || princess.x === 303) {
        //     princess.x = 303 + randomizer(1, 3) * 101;
        // }
        // if (princess.x === 404 || princess.x === 505) {
        //     princess.x = 303 - randomizer(1, 4) * 101;
        // }
        //
    }

    // if (reachGoal() === true) {
    //     for (var i = 1; i < 6; i++) {
    //         this.x = 303 - 101 * i;
    //     }
    // }
            // reachGoal();

}
var Star = function(x, y) {
    this.sprite = 'images/Star2.png';
    this.x = x;
    this.y = y;
}

Star.prototype.update = function() {
    // star.x = princess.x;
    reachGoal();
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var keepInFrame = function() {

    // Prevents player from traveling off screen
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 606) {
        player.x = 606;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y < 50) {
        player.y = 50;
    }
}

var checkCollision = function(anEnemy) {
    // If player comes too close to an enemy
       
    if (player.y + 51 >= anEnemy.y
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

    // if (player.y === -35 && player.x + 1 !== princess.x) {
    //         console.log("Player's y is " + player.y);
    //         console.log("You went into the water!");
            
    //         if (score >= 25) {
    //             score -= 75;
    //         }
    // }
}

var displayHeartLevel = function(score, heart, level) {
    // document.getElementById('title').innerHTML = "<strong><span style='font-size: 22.5px'>HOW TO PLAY</span></strong> <br><br>Travel with your ←→↑↓ keys. <br><br> Collect <img src='images/Heart3.png' style='vertical-align: middle; height: 1.25em'> from the <img src='images/char-princess-girl2.png' style='vertical-align: middle; height: 1.25em'>, earning 50 points each time.<br><br>You lose 25 points per <img src='images/enemy-bug2.png' style='vertical-align: middle; height: 1.25em'> encounter! <strong><br><br>To beat the game, you must reach 1000 points.</strong><br><br><br><br><br><br><br><br><br><br><br><span style='line-height: 25px'>Developed by <a href='http://www.albertchanged.me' target='_blank' style='text-decoration: none' ><strong>Albert Chang</strong></a> for <a href='https://www.udacity.com/' target='_blank' style='text-decoration: none'>Udacity's</a> <a href='https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001' target='_blank' style='text-decoration: none'> <strong>Front-End Web Developer Nanodegree</strong></a> course.</span>"
    document.getElementById('scores').innerHTML = "<strong>Score:</strong> " + "<span style='font-size: 27.5px'>" + this.score + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.getElementById('hearts').innerHTML = "<img src='images/Heart3.png' style='height: 1.5em; vertical-align: middle'>" + " x " + "<span style='font-size: 27.5px'>" + this.heart + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.getElementById('levels').innerHTML = "<strong>On Path:</strong> " + "<span style='font-size: 27.5px'>" + this.level + " </span><img src='images/enemy-bug2.png' style='vertical-align: middle; height: 1.5em'>";
    document.getElementById('winherlove').innerHTML ="Win Her <span style='color: #D00000'>Love</span>";
    // document.getElementById('winherlove').innerHTML ="Win Her <span style='color: #DF0101'>Love</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-family: Helvetica, Arial; font-size: 25px; margin-top: 20%'><strong>High Score:</strong> " + "<span style='font-size: 27.5px'>" + localStorage.getItem("highscore") + "</span></span>";
    document.getElementById('highscore').innerHTML = "<strong>High Score:</strong> " + "<span style='font-size: 25px'>" + localStorage.getItem("highscore") + "</span>";
}

var reachGoal = function() {
    if (player.y < 0) {   
        if (Math.abs(princess.x - player.x) < 10) {  
            heart += 1;
            player.x = 303;
            player.y = 383;
            console.log('You made it!');
            score += 50;


            ctx.clearRect(princess.x, 0, 101, 250); 
            star.x = -101;
            princess.x = -101;

            if (this.x === -101) {
                this.x = -101 + randomizer(2, 8) * 101;
            }

            // for (var i = 1; i < 10; i++) {
                // FOR PREVIOUS SCORING IDEA: If score equals a multiple of 100 or 
                // is within bounds (200 < x < 226 will earn a heart),
                // earn a heart 
                // if (score === 100*i || (score < (100*i + 26) && (score > (100*i)))) {
                //     heart += 1;
                // }
            // }
            
            // If the player reaches or is within bounds of 1000, they have beaten the game!
            if (score === 1000 || (score < (1026) && (score > (1000)))) {
                window.alert("Congratulations! You have beaten the game. Don't forget to invite me to your wedding with the Princess!");
            }
            level += 1;

            // console.log("Your high score is " + localStorage.getItem("highscore"));
            console.log('Score: ' + score + ', Number of Hearts: ' + heart + ', Current Level: ' + level);
            addMoreEnemies();
        }
        else {
            player.y = 383;
            player.x = 303;
            score -= 25;

            ctx.clearRect(princess.x, 0, 101, 250);
            princess.x = -101 + randomizer(2, 8) * 101;
            star.x = princess.x - 5.5;
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
var player = new Player(303, 383, 101, 85);
var star = new Star(297.5, -7.5); // -12
var princess = new Princess(303, -25);
var enemy = createEnemy();
var score = 0;
var heart = 0;
var level = 1;

var scores = [];
localStorage.setItem("highscore", score);
// scores.push({highscore: score});
// localStorage["WinHerLove_HighScores"] = JSON.stringify(scores);


// if (localStorage) {
//     localStorage["WinHerLove_HighScores"] = score;
// }
// if (localStorage) {
//     if (localStorage["WinHerLove_HighScores"] !== undefined) {
//         scores =  Number(localStorage["WinHerLove_HighScores"]);
//         console.log(scores);
//     }
// }

var randomizer = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
console.log(localStorage.getItem("highscore"));

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


