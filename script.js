// script.js
const canvas = document.getElementById('neural-network-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 1.5;
  this.dx = (Math.random() - 0.5) * 1;
  this.dy = (Math.random() - 0.5) * 1;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#9df9ef';
    ctx.fill();
  };

  this.update = function() {
    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
    this.x += this.dx;
    this.y += this.dy;
  };
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(Math.random() * width, Math.random() * height));
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(157, 249, 239, ${1 - distance / 100})`;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
animate();
