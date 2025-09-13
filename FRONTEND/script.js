if (typeof ScrollReveal !== 'undefined') {
        const scrollReveal = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            reset: true
        });

        scrollReveal.reveal('.section-header', { delay: 200 });
        scrollReveal.reveal('.about-text', { delay: 300 });
        scrollReveal.reveal('.about-visual', { delay: 400 });
        scrollReveal.reveal('.event-card', { delay: 300, interval: 200 });
        scrollReveal.reveal('.contact-form', { delay: 300 });
        scrollReveal.reveal('.contact-visual', { delay: 400 });
    }



// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typingDiv;
}

// Remove typing indicator
function removeTypingIndicator(typingDiv) {
    typingDiv.remove();
}
// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});



 const logo = document.getElementById('logo-3d');
    if (logo) {
        logo.addEventListener('mousemove', function(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;

            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            const textShadow = `${shadowX}px ${shadowY}px 10px rgba(255, 77, 0, 0.7)`;

            this.style.textShadow = textShadow;
            this.style.transform = `perspective(500px) rotateX(${(centerY - y) / 20}deg) rotateY(${(x - centerX) / 20}deg)`;
        });

        logo.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
            this.style.transform = 'none';
        });
    }

// 3D effect for CTA button
const ctaButton = document.getElementById('cta-3d');

ctaButton.addEventListener('mousemove', function(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const centerX = this.offsetWidth / 2;
    const centerY = this.offsetHeight / 2;

    this.style.transform = `perspective(500px) rotateX(${(centerY - y) / 10}deg) rotateY(${(x - centerX) / 10}deg)`;
});

ctaButton.addEventListener('mouseleave', function() {
    this.style.transform = 'none';
});

// Fire animation for about section
// const fire = document.getElementById('fire');
// createFireAnimation(fire);
const fire = document.getElementById('fire');
    if (fire) createFireAnimation(fire);


// Particle animation for contact section
// const particles = document.getElementById('particles');
// createParticleAnimation(particles);
const particles = document.getElementById('particles');
    if (particles) createParticleAnimation(particles);


const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;

            this.style.transform = `perspective(1000px) rotateX(${(centerY - y) / 20}deg) rotateY(${(x - centerX) / 20}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'none';
        });
    });

// 3D member effects
const members = document.querySelectorAll('.member');
members.forEach((member, index) => {
    const avatar = member.querySelector('.member-avatar');
    avatar.textContent = member.querySelector('h3').textContent.charAt(0);

    member.addEventListener('mousemove', function(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const centerX = this.offsetWidth / 2;
        const centerY = this.offsetHeight / 2;

        this.style.transform = `perspective(1000px) rotateX(${(centerY - y) / 20}deg) rotateY(${(x - centerX) / 20}deg)`;
    });

    member.addEventListener('mouseleave', function() {
        this.style.transform = 'none';
    });
});






function createFireAnimation(container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const particles = [];
    const particleCount = 100;
    const colors = ['#ff4d00', '#ff9500', '#ffcc00', '#ffffff'];

    class Particle {
        constructor() {
            this.x = canvas.width / 2 + (Math.random() - 0.5) * 50;
            this.y = canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = -(Math.random() * 3 + 2);
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.decay;
            this.size *= 0.99;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create new particles
        if (particles.length < particleCount) {
            particles.push(new Particle());
        }

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Remove dead particles
            if (particles[i].alpha <= 0 || particles[i].size <= 0.5) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', function() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}

function createParticleAnimation(container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const particles = [];
    const particleCount = 50;
    const colors = ['#ff4d00', '#ff9500', '#ffcc00'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let particle of particles) {
            particle.update();
            particle.draw();

            // Draw connecting lines
            for (let other of particles) {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 77, 0, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', function() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}
