import React, { useEffect, useRef } from 'react';
import { brands } from '../assets/media/brands/brandsData.js';
import { animate, stagger } from 'animejs';

const PROJECTS_DATA = [
  { title: 'Robótica Industrial', img: '/src/assets/media/rob.jpg', description: 'Soluciones avanzadas en automatización robótica para la industria moderna.' },
  { title: 'Control de Procesos', img: '/src/assets/media/pro.jpg', description: 'Sistemas de control precisos para optimizar procesos industriales.' },
  { title: 'Eficiencia Energética', img: '/src/assets/media/efi.jpg', description: 'Tecnologías para reducir el consumo energético y mejorar la sostenibilidad.' },
  { title: 'Sistemas Embebidos', img: '/src/assets/media/sis.jpg', description: 'Desarrollo de sistemas embebidos personalizados para aplicaciones específicas.' },
  { title: 'Automatización de Plantas', img: '/src/assets/media/aut.jpg', description: 'Automatización completa de plantas industriales para mayor productividad.' },
];

export default function Projects() {
  const projectsGridRef = useRef(null);
  const brandsRef = useRef(null);

  useEffect(() => {
  // Animación de las cards en grid
  animate('.card', {
    translateY: [20, 0],
    opacity: [0, 1],
    delay: stagger(100),
    duration: 800,
    easing: 'easeOutQuad',
  });

  // Animación de las marcas
  animate('.brand-logo', {
    scale: [0.8, 1],
    opacity: [0.5, 1],
    delay: stagger(200),
    duration: 1000,
    easing: 'easeOutElastic(1, .8)',
  });

  // Efecto spotlight en brands section
  const brandsSection = brandsRef.current;
  if (brandsSection) {
    const spotlight = brandsSection.querySelector('.spotlight');
    const handleMouseMove = (e) => {
      const rect = brandsSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (spotlight) {
        spotlight.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
      }
    };

    const handleMouseEnter = () => {
      if (spotlight) spotlight.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (spotlight) spotlight.style.opacity = '0';
    };

    brandsSection.addEventListener('mousemove', handleMouseMove);
    brandsSection.addEventListener('mouseenter', handleMouseEnter);
    brandsSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      brandsSection.removeEventListener('mousemove', handleMouseMove);
      brandsSection.removeEventListener('mouseenter', handleMouseEnter);
      brandsSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }
}, []);


  return (
    <div className="projects-container">
      {/* Sección de Proyectos */}
      <section className="projects-section">
        <h2 className="section-title">Nuestros Proyectos</h2>
        <p className="section-description">
          Descubre nuestras soluciones innovadoras en automatización e ingeniería industrial.
        </p>
        <div className="projects-grid" ref={projectsGridRef}>
          {PROJECTS_DATA.map((item, index) => (
            <div key={index} className="card">
              <div className="card-image-container">
                <img src={item.img} alt={item.title} />
                <div className="card-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Marcas */}
      <section className="brands-section" ref={brandsRef}>
        <div className="spotlight"></div>
        <h2 className="section-title">Marcas Asociadas</h2>
        <p className="section-description">
          Colaboramos con las mejores marcas del sector para ofrecerte soluciones de vanguardia.
        </p>
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-logo-container">
              <img src={brand} alt={`Marca ${index + 1}`} className="brand-logo" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
