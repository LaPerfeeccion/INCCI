import anime from 'https://unpkg.com/animejs@3.2.1/lib/anime.es.js';
// Home.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import ThreeScene from '../components/ThreeScene';
import Projects from './Proyects';
import ContactForm from '../components/ContactForm';
import './Home.css';
import TD from '../components/TD';

export default function Home() {
  const whoSectionRef = useRef(null);
  const whoTextRef = useRef(null);
  const whoLogoRef = useRef(null);

  useEffect(() => {
    // Configuración del Intersection Observer mejorado
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerImmersiveAnimation(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    // Animación inmersiva principal
    function triggerImmersiveAnimation(target) {
      // Efecto de entrada suave
      anime({
        targets: target.querySelectorAll('.who-text'),
        opacity: [0, 1],
        translateY: [100, 0],
        rotateX: [20, 0],
        scale: [0.8, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)',
        delay: anime.stagger(100),
      });

      // Animación del logo con efecto parallax
      anime({
        targets: target.querySelectorAll('.who-logo'),
        opacity: [0, 1],
        translateY: [-100, 0],
        rotateY: [180, 0],
        scale: [0, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)',
        delay: 200,
      });

      // Efectos de hover inmersivos
      const elements = target.querySelectorAll('.who-text h2, .who-text h3, .who-text p');
      elements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
          anime({
            targets: e.target,
            scale: [1, 1.05],
            backgroundColor: ['#ffffff', '#f8f8f8'],
            duration: 300,
            easing: 'easeOutSine',
          });
        });

        element.addEventListener('mouseleave', (e) => {
          anime({
            targets: e.target,
            scale: [1.05, 1],
            backgroundColor: ['#f8f8f8', '#ffffff'],
            duration: 300,
            easing: 'easeOutSine',
          });
        });
      });
    }

    // Observar la sección
    if (whoSectionRef.current) {
      observer.observe(whoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <section id='hero'>
        <header className="navbar">
        <div className="brand">INCCI</div>
        <div className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="nav">
          <a href="#who">Quiénes Somos</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>
      </section>
      

      <main>
        <motion.section 
          className="hero"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ThreeScene />
          <motion.div 
            className="hero-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="title">INCCI — Control Engineering G&G</h1>
            <p className="lead">Ingeniería de control, automatización y soluciones industriales.</p>
            <a href="#projects" className="cta">Ver proyectos</a>
          </motion.div>
        </motion.section>

       <motion.section 
         id="who" 
         className="who"
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 1, ease: "easeOut" }}
         viewport={{ once: true }}
       >
        <div className="who-inner">
          <motion.div 
            className="who-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2>¿Quiénes Somos?</h2>
            <p>
              INCCI es una empresa líder en ingeniería de control y automatización industrial. 
              Ofrecemos soluciones innovadoras para optimizar procesos industriales y mejorar 
              la eficiencia operacional de nuestros clientes.
            </p>
            
            <div className="who-features">
              <motion.div 
                className="feature-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">⚙️</div>
                <div className="feature-text">
                  <h4>Ingeniería de Control</h4>
                  <p>Sistemas avanzados para automatización industrial</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="feature-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">🔧</div>
                <div className="feature-text">
                  <h4>Soluciones Personalizadas</h4>
                  <p>Adaptamos cada proyecto a tus necesidades específicas</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="feature-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <h4>Optimización de Procesos</h4>
                  <p>Mejora de eficiencia y reducción de costos</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="who-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="who-card">
              <h3>15+</h3>
              <p>Años de experiencia en control e ingeniería</p>
              <hr style={{borderColor: 'var(--border)', margin: '20px 0'}} />
              <h3 style={{fontSize: '1.5rem', margin: '0'}}>50+</h3>
              <p>Proyectos exitosos completados</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

        <motion.section 
          id="projects" 
          className="projects-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Projects />
        </motion.section>

        <motion.section 
          id="contact" 
          className="contact-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Contacto</h2>
          <ContactForm />
        </motion.section>
      </main>

      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} INCCI — Control Engineering G&G
      </motion.footer>
      {/* <TD /> */}
    </div>
  );
}