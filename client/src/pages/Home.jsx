import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const fireRef = useRef(null);
  const particlesRef = useRef(null);
  const contactFormRef = useRef(null);
  const [formStatus, setFormStatus] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

  useEffect(() => {
    // Handle hash scrolling
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    // ScrollReveal initialization
    if (window.ScrollReveal) {
      const sr = window.ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        reset: true
      });
      sr.reveal('.section-header', { delay: 200 });
      sr.reveal('.about-text', { delay: 300 });
      sr.reveal('.about-visual', { delay: 400 });
      sr.reveal('.event-card', { delay: 300, interval: 200 });
      sr.reveal('.contact-form', { delay: 300 });
      sr.reveal('.contact-visual', { delay: 400 });
    }

    // Fire Animation
    const initFire = () => {
      const container = fireRef.current;
      if (!container) return;
      const canvas = document.createElement('canvas');
      container.innerHTML = '';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      const particles = [];
      const particleCount = 100;
      const colors = ['#ff4d00', '#ff9500', '#ffcc00', '#ffffff'];

      class Particle {
        constructor() {
          this.reset();
        }
        reset() {
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
          if (this.alpha <= 0 || this.size <= 0.5) this.reset();
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

      for (let i = 0; i < particleCount; i++) particles.push(new Particle());

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        requestAnimationFrame(animate);
      };
      animate();
    };

    // Particle Animation
    const initParticles = () => {
      const container = particlesRef.current;
      if (!container) return;
      const canvas = document.createElement('canvas');
      container.innerHTML = '';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      const particles = [];
      const particleCount = 50;
      const colors = ['#ff4d00', '#ff9500', '#ffcc00'];

      class Particle {
        constructor() {
          this.reset();
        }
        reset() {
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

      for (let i = 0; i < particleCount; i++) particles.push(new Particle());

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.update();
          p.draw();
          particles.forEach(other => {
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              ctx.strokeStyle = `rgba(255, 77, 0, ${1 - distance / 100})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          });
        });
        requestAnimationFrame(animate);
      };
      animate();
    };

    initFire();
    initParticles();

    // 3D Effects logic
    const handle3DEffect = (el, intensity = 20) => {
      const mouseMove = (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const centerX = el.offsetWidth / 2;
        const centerY = el.offsetHeight / 2;
        el.style.transform = `perspective(1000px) rotateX(${(centerY - y) / intensity}deg) rotateY(${(x - centerX) / intensity}deg)`;
      };
      const mouseLeave = () => {
        el.style.transform = 'none';
      };
      el.addEventListener('mousemove', mouseMove);
      el.addEventListener('mouseleave', mouseLeave);
      return () => {
        el.removeEventListener('mousemove', mouseMove);
        el.removeEventListener('mouseleave', mouseLeave);
      };
    };

    const logo = document.getElementById('logo-3d');
    const cta = document.getElementById('cta-3d');
    const cards = document.querySelectorAll('.event-card');

    if (logo) handle3DEffect(logo);
    if (cta) handle3DEffect(cta, 10);
    cards.forEach(card => handle3DEffect(card));

  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    setFormStatus('sending');
    try {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok) {
        setFormStatus('success');
        e.target.reset();
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  return (
    <>
      <section id="home" className="hero">
        <h1 className="title-3d">IGNITE YOUR <span>POTENTIAL</span></h1>
        <p className="subtitle">Join the flame of innovation and creativity</p>
        <a href="https://qr.me-qr.com/ztxhhl1W" target="_blank" rel="noopener noreferrer">
          <button className="cta-button" id="cta-3d">Join Now</button>
        </a>
        <div className="floating-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="section-header">
          <h2>About <span>Inferno</span></h2>
          <div className="underline"></div>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>Inferno is the premier student organization at our college dedicated to fostering innovation, creativity, and technical excellence.</p>
            <p>We organize workshops, hackathons, and networking events to help students ignite their potential and stand out in the competitive world.</p>
          </div>
          <div className="about-visual">
            <div className="fire-animation" id="fire" ref={fireRef}></div>
          </div>
        </div>
      </section>

      <section id="events" className="section events">
        <div className="section-header">
          <h2>Our <span>Events</span></h2>
          <div className="underline"></div>
        </div>
        <div className="event-cards">
          <div className="event-card" id="card1">
            <div className="card-content">
              <h3>Hack the Flame</h3>
              <p>Annual 48-hour hackathon where students build innovative solutions to real-world problems.</p>
              <div className="event-date">Oct 15-17, 2025</div>
            </div>
          </div>
          <div className="event-card" id="card2">
            <div className="card-content">
              <h3>Spark Sessions</h3>
              <p>Weekly workshops on emerging technologies and skill development.</p>
              <div className="event-date">Every Wednesday</div>
            </div>
          </div>
          <div className="event-card" id="card3">
            <div className="card-content">
              <h3>Inferno Fest</h3>
              <p>Our flagship annual tech and cultural festival with competitions and performances.</p>
              <div className="event-date">August 5-7, 2025</div>
            </div>
          </div>
        </div>
      </section>



      <section id="contact" className="section contact">
        <div className="section-header">
          <h2>Get in <span>Touch</span></h2>
          <div className="underline"></div>
        </div>

        {/* Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">🕒</div>
            <h3>Office Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
            <p>Saturday: 10:00 AM - 4:00 PM IST</p>
            <p className="special-note">During hackathon: 24/7 support available</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h3>Response Times</h3>
            <p>General Inquiries: Within 24 hours</p>
            <p>Technical Support: Within 12 hours</p>
            <p className="special-note">Urgent Issues: Within 4 hours</p>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <form className="contact-form" id="contact-form" onSubmit={handleContactSubmit}>
              <h3>Send us a Message</h3>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" id="name" name="name" required />
                  <label htmlFor="name">Your Name</label>
                </div>
                <div className="form-group">
                  <input type="email" id="email" name="email" required />
                  <label htmlFor="email">Your Email</label>
                </div>
              </div>
              <div className="form-group">
                <input type="text" id="subject" name="subject" />
                <label htmlFor="subject">Subject</label>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" required></textarea>
                <label htmlFor="message">Tell us how we can help you...</label>
              </div>
              <button type="submit" className="submit-btn" id="submit-btn" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending...' : '➤ Send Message'}
              </button>
              {formStatus === 'success' && <p className="status-msg success">Message sent successfully!</p>}
              {formStatus === 'error' && <p className="status-msg error">Something went wrong. Please try again.</p>}
            </form>

            <div className="faq-mini-section">
              <h3>Quick resolve FAQ</h3>
              <div className="faq-grid mini">
                <div className="faq-item">
                  <h4>How do I join the Core Team?</h4>
                  <p>We recruit through annual orientations and the "Ignite" challenge. Follow our Instagram for upcoming dates!</p>
                </div>
                <div className="faq-item">
                  <h4>Are events open to all colleges?</h4>
                  <p>Yes! Inferno fosters a pan-college tech community. Most events are open to all passionate learners.</p>
                </div>
                <div className="faq-item">
                  <h4>Can I suggest a workshop?</h4>
                  <p>Definitely! Use the contact form to suggest topics. We love hosting sessions based on community demand.</p>
                </div>
                <div className="faq-item">
                  <h4>Where can I find mentorship?</h4>
                  <p>Join our weekly "Spark Sessions" or reach out on Discord for 1-on-1 guidance from our senior developers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <h3>Team Contacts</h3>
            <div className="team-contact-box">
              <div className="contact-category">
                <h4>Organizer Team</h4>
                <p>Event Organization</p>
                <a href="mailto:infernoofficial8@gmail.com">✉ infernoofficial8@gmail.com</a>
                <a href="tel:+916287830296">📞 +91 62878 30296</a>
              </div>
              <div className="contact-category">
                <h4>Technical Team</h4>
                <p>Technical Support</p>
                <a href="mailto:someshranjanbiswal13678@gmail.com">✉ someshranjanbiswal13678@gmail.com</a>
                <a href="tel:+917008450074">📞 +91 70084 50074</a>
              </div>
              <div className="contact-category">
                <h4>Sponsorship Team</h4>
                <p>Partnerships & Sponsorship</p>
                <a href="mailto:infernoofficial8@gmail.com">✉ infernoofficial8@gmail.com</a>
                <a href="tel:+916287830296">📞 +91 62878 30296</a>
              </div>
            </div>
            <div className="contact-visual-bg">
              <div className="particles" id="particles" ref={particlesRef}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
