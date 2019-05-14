"use strict";
// Enemies our player must avoid

// state of the game
const GAMESTATE = {
    START: 0,
    RUNNING: 1,
    PAUSED: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    WIN: 5
  };

class Enemy {
    constructor(x,y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        // enemies are moving only if gamestate is running
        if (player.gameState == GAMESTATE.RUNNING) {
            //bug is moving in range and come back to start position
            if (this.x < 500) {
                this.x += this.speed * dt;
            }
            else {
                this.x = -100;
            }
        }
        

        // checking collsion betwem player and enemies
        if (player.x <= this.x + 70 && 
            player.x >= this.x - 70 && 
            player.y <= this.y + 18 && 
            player.y >= this.y -18) 
                {
                    player.x = 101*2;
                    player.y = ((83*4)+70);
                    
                    // When the collision happens, the gameState changes to gameover
                    player.gameState = GAMESTATE.GAMEOVER;
                }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.gameState = GAMESTATE.START;
    }
    countdown() {
        let timeLeft = 3;
        let timer = setInterval(function(){
            console.log(`${timeLeft} seconds`);
            timeLeft -= 1;
            if (timeLeft <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    }
    
    update() {
        if (this.y < 70) {
            this.x = 101*2;
            this.y = ((83*4)+70);
            this.gameState = GAMESTATE.WIN;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        // SCREEN: Start
        if (this.gameState === GAMESTATE.START) {
            ctx.rect(0,50, 505, 535);
            ctx.fillStyle ="rgba(0,0,0,0.5)";
            ctx.fill(); 

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR To Start", 505 / 2, 535 / 2);
            // to do countdown
            
        }
        
        
        // SCREEN: RUNNING
        if (this.gameState === !GAMESTATE.RUNNING) {
            ctx.clearRect(0,0, 0,50, 505, 535);
        }

        // SCREEN: YOU HAVE WON
        if (this.gameState === GAMESTATE.WIN) {
            ctx.rect(0,50, 505, 535);
            ctx.fillStyle ="rgba(0,0,0,0.5)";
            ctx.fill(); 

            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("You Have Won!", 505 / 2, 535 / 2);
            ctx.font = "25px Arial";
            ctx.fillText("Press SPACE to restart", 505 / 2, 535 /2 + 80);
        }

        // SCREEN: GAME
        if (this.gameState === GAMESTATE.GAMEOVER) {
            ctx.rect(0,50, 505, 535);
            ctx.fillStyle ="rgba(0,0,0,0.5)";
            ctx.fill(); 

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", 505 / 2, 535 / 2);
            ctx.font = "25px Arial";
            ctx.fillText("Press SPACE to restart", 505 / 2, 535 /2 + 80);
        }

        // SCREEN: PAUSED
        if (this.gameState === GAMESTATE.PAUSED) {
            ctx.rect(0,50, 505, 535);
            ctx.fillStyle ="rgba(0,0,0,0.5)";
            ctx.fill(); 

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", 505 / 2, 535 / 2);
            ctx.font = "25px Arial";
            ctx.fillText("Press SPACE to continue", 505 / 2, 535 /2 + 80);
        }
    }

    handleInput(allowedKeys) {
        switch(allowedKeys) {
            case 'left':
                if (this.x - 101 >= 0 && this.gameState === GAMESTATE.RUNNING) {
                    this.x -= 101;
                }
                break;
                
            case 'up':
                    if (this.gameState === GAMESTATE.RUNNING) {this.y -= 83}
                    break;
                    
            
            case 'right':
                if (this.x + 101 < 505 && this.gameState === GAMESTATE.RUNNING) {
                    this.x += 101;
                }
                break;
            
            case 'down':
                if (this.y + 83 <= 506 - 70 && this.gameState === GAMESTATE.RUNNING) {
                    this.y += 83;
                }
                break;
            case 'space':
                console.log("space");
                if (this.gameState === GAMESTATE.RUNNING) {
                    console.log("paused");
                    this.gameState = GAMESTATE.PAUSED;
                    console.log(this.gameState);
                } else if(this.gameState === GAMESTATE.PAUSED) {
                    console.log("unpaused");
                    this.gameState = GAMESTATE.RUNNING;
                } else if(this.gameState === GAMESTATE.START) {
                    // to do: count down functin
                    this.gameState = GAMESTATE.RUNNING;
                } else if (this.gameState === GAMESTATE.GAMEOVER || this.gameState === GAMESTATE.WIN) {
                    this.gameState = GAMESTATE.START;
                }
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(-100, 83+70, 55),
    new Enemy(-100, 70, 66),
    new Enemy(-100, 83*2+70, 80)
];

// Place the player object in a variable called player
let player = new Player(101*2, (83*4)+70);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        };

    player.handleInput(allowedKeys[e.keyCode]);
});

// checking if countdown function works
player.countdown();