const canvas = document.getElementById('sparkles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = canvas.offsetHeight;

const particlesArray = [];
const numberOfParticles = 150;

class Particle {
    constructor() {
        // Genera partículas en un área debajo del texto
        this.angle = Math.random() * Math.PI; // Rango de 0 a PI para una curva suave
        this.radius = 100 + Math.random() * 50; // Ajusta el radio para una dispersión moderada
        this.x = canvas.width / 2 + this.radius * Math.cos(this.angle);
        this.y = canvas.height / 2 + this.radius * Math.sin(this.angle);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.01;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Elimina partículas pequeñas para regenerarlas
        if (particlesArray[i].size <= 0.1) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
});

initParticles();
animate();
