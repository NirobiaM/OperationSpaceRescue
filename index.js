let startBtn = document.querySelector('#start')
startBtn.addEventListener('click', game)
let aliensDiv = document.querySelector('#aliens')
let playerShiphull = document.querySelector('#player-shiphull')

// number of milliseconds between each turn
const TURN_LENGTH = 125

class Ship {

    constructor (shiphull, firepower, accuracy, name){
        this.shiphull = shiphull || randRange(4, 12)
        this.firepower = firepower || randRange(0.5, 3)
        this.accuracy = accuracy || randRange(0.4, 0.7)
        this.name = name
        this.dead = false
    }

    fire(target){
        let hit = false
        if(Math.random() < this.accuracy){
            target.shiphull -= this.firepower;
            hit = true
        }
        console.log(`${this.name} fired at ${target.name}`)
        if (hit) {
            if (target.alien) target.displayHp()
            console.log(`${this.name} hit ${target.name}.`)
            if (target.shiphull <= 0) {
                target.dead = true
                target.die()
                console.log(`${target.name} was destroyed.`)
            }
        } else {
            console.log(`${this.name} missed.`)
        }
        if (target.alien) {
            // setTimeout(fn, ms)
            setTimeout(() => {
                alienTurn(target)
            }, TURN_LENGTH);
        } else {
            setTimeout(() => {
                playerTurn()
            }, TURN_LENGTH);
        }
    }

    die() {

    }
}


const roomba = new Ship(20, 5, .7, 'Roomba')
updateShiphull()

class Alien extends Ship {
    constructor (){
        super()
        this.alien = true
        this.el = document.createElement('div')
        this.img = document.createElement('img')
        this.img.src = './image/enemy_ship.png'
        this.el.append(this.img)
        this.el.classList.add('alien')

        this.hp = document.createElement('div')
        this.hp.classList.add('alien-hp')
        this.el.append(this.hp)
        this.displayHp()

        aliensDiv.append(this.el)
        Alien.enemyFleet.push(this)
        this.name = `Alien #${Alien.enemyFleet.length}`
    }

    die() {
        this.el.style.filter = 'grayscale(1)'
    }

    displayHp() {
        this.hp.innerText = this.shiphull.toFixed(2)
    }

    static enemyFleet = []
}

function randRange(x, y) {
    return Math.random()*(y-x) + x
}

function game() {
    startBtn.removeEventListener('click', game)
    for (let i = 0 ; i < 6 ; i ++) {
        new Alien()
    }
    playerTurn()
}

/*
    for (i = 0 ; i < 5 ; i++) {

    }
*/

function playerTurn() {
    updateShiphull()
    if (roomba.shiphull < 0 ) {
        alert('you died!')
        return
    }
    let enemyShip = Alien.enemyFleet.find(alien => !alien.dead)
    if (!enemyShip) {
        alert('You won!')
    } else {
        roomba.fire(enemyShip)
    }
}

function alienTurn(alien) {
    alien.fire(roomba)
    updateShiphull()
}

function updateShiphull() {
    playerShiphull.innerText = roomba.shiphull.toFixed(2)
}

// addAlien (){
//     this.shiphull = Math.round(Math.random()*(6-3) + 3) // enemy hull is between 3 and 6
//     this.firepower = Math.round(Math.random()*(4-2) + 2) // enemy firepower is between 2 and 4
//     this.accuracy = Math.round(Math.random()*(.12 - .6) + .2) //enemy accuracy is between .6 and .8
//     this.ships.push (new Ship (this.shiphull, this.firepower, this.accuracy = (Math.random()*(.6 - .8) + .8).toFixed(1)));
// }

//Attack
// const attackAliens =()=>{
//     let enemyfleet = enemyAlien.ships;
//     for(let i=0; i<enemyAlien.ships.length; i++){
//         //we need to check if our ship is destroyed,
//         if (Roomba.shiphull <= 0){
//             console.log("Game Over you ship has been destroyed");
//             break;
//         }
//         while (Roomba.shiphull > 0 || enemyfleet[i].shiphull > 0){
//             if(Math.random() < Roomba.accuracy){
//                 enemyAlien.ships[i].shiphull = enemyAlien.ships[i].shiphull - Roomba.firepower
//             }
//             // Need to check if enemy alien ship is destroyed
//             if (enemyAlien.ships [i].shiphull <= 0){
//                 console.log("Hoorayy the enemy has been destroyed");
//                 break;
//             }
//             if (Math.random() < enemyAlien.ships[i].accuracy){
//                 Roomba.shiphull = Roomba.shiphull - enemyAlien.ships[i].firepower
//             }
//             if (Roomba.shiphull <= 0){
//                 console.log("Game Over you ship has been destroyed");
//                 break;
//             }
//         }
//     }
// }
// attackAliens()
