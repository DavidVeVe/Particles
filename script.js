const canvas = document.getElementById('canvas');
const area = canvas.getContext('2d');
area.canvas.width = window.innerWidth;
area.canvas.height = window.innerHeight;
let particleArray;

// constructor function below

function Particle (x, y, directionx, directiony, size, color) {
    this.x = x;
    this.y = y;
    this.directionx = directionx;
    this.directiony = directiony;
    this.size = size;
    this.color = color;
}

// add draw method to prototype

Particle.prototype.draw = function () {
    area.beginPath();
    area.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    area.fillStyle = this.color;
    area.fill();
}

// const particle1 = new Particle(100, 100, 1, 1, 10, 'yellow')
// particle1.draw()

// add update to constructor

Particle.prototype.update = function () {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionx = -this.directionx
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directiony = -this.directiony
    }
    this.x -= this.directionx
    this.y -= this.directiony

    this.draw()
}


// create particle array

function init () {
    particleArray = []

    for (let i = 0; i < 15; i++) {
        let size = Math.random() * 30;
        let x = Math.random() * (innerWidth - size * 2)
        let y = Math.random() * (innerHeight - size * 2)
        let directionx = (Math.random() * .2) - .2
        let directiony = (Math.random() * .2) - .2
        let color = 'black'

        particleArray.push(new Particle(x, y, directionx, directiony, size, color))
    }
}

function animate () {
    requestAnimationFrame(animate)
    area.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
    }
}

init()
animate()