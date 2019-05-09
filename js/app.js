"use strict";
// Enemies our player must avoid
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

        //bug is moving in range and come back to start position
        if (this.x < 500) {
            this.x += this.speed * dt;
        }
        else {
            this.x = -100;
        }

        // checking collsion betwem player and enemies
        if (player.x <= this.x + 70 && 
            player.x >= this.x - 70 && 
            player.y <= this.y + 18 && 
            player.y >= this.y -18) 
                {
                    player.x = 101*2;
                    player.y = ((83*4)+70);
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
    }

    update() {
        if (this.y < 70) {
            this.x = 101*2;
            this.y = ((83*4)+70);
            alert("YOU HAVE WON!");           
    }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(allowedKeys) {
        switch(allowedKeys) {
            case 'left':
                if (this.x - 101 >= 0) {
                    this.x -= 101;
                }
                break;
                
            case 'up':
                    this.y -= 83;
                    break;
                    
            
            case 'right':
                if (this.x + 101 < 505) {
                    this.x += 101;
                }
                break;
            
            case 'down':
                if (this.y + 83 <= 506 - 70) {
                    this.y += 83;
                }
                
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
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});