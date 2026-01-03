import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './td.css';
import { gsap } from 'gsap';

const TD = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 13;

    const scene = new THREE.Scene();
    let robot;
    let mixer;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    const loader = new GLTFLoader();
    loader.load(
      '/src/assets/3d/arcane.glb',
      function (gltf) {
        console.log('Modelo cargado correctamente');
        robot = gltf.scene;
        scene.add(robot);

        mixer = new THREE.AnimationMixer(robot);
        mixer.clipAction(gltf.animations[0]).play();
        modalMove();
      },
      function (xhr) {
        console.log(`${(xhr.loaded / xhr.total) * 100}% cargado`);
      },
      function (error) {
        console.error('Error cargando el modelo:', error);
      }
    );

    const reRender3D = () => {
      requestAnimationFrame(reRender3D);
      renderer.render(scene, camera);
      if (mixer) mixer.update(0.02);
    };
    reRender3D();

    const arrPositionModel = [
      {
        id: 'hero',
        position: { x: 0, y: -1, z: 0 },
        rotation: { x: 0, y: 1.5, z: 0 },
        scale: { x: 0.3, y: 0.3, z: 0.3 }
      },
      {
        id: 'who',
        position: { x: 1.5, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
        scale: { x: 0.5, y: 0.5, z: 0.5 } // Mitad del tamaño original
      },
      {
        id: 'projects',
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
        scale: { x: 0.5, y: 0.5, z: 0.5 } // Mitad del tamaño original
      },
      {
        id: 'contact',
        position: { x: 1, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
        scale: { x: 0.3, y: 0.3, z: 0.3 } 
      }
    ];

    const modalMove = () => {
      const sections = document.querySelectorAll('section');
      let currentSection;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = section.id;
        }
      });

      let position_active = arrPositionModel.findIndex((val) => val.id === currentSection);

      if (position_active >= 0 && robot) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(robot.position, {
          x: new_coordinates.position.x,
          y: new_coordinates.position.y,
          z: new_coordinates.position.z,
          duration: 1.5,
          ease: 'power1.out'
        });
        gsap.to(robot.rotation, {
          x: new_coordinates.rotation.x,
          y: new_coordinates.rotation.y,
          z: new_coordinates.rotation.z,
          duration: 3,
          ease: 'power1.out'
        });
        // Añadir animación de escala
        gsap.to(robot.scale, {
          x: new_coordinates.scale.x,
          y: new_coordinates.scale.y,
          z: new_coordinates.scale.z,
          duration: 1.5,
          ease: 'power1.out'
        });
      }
    };

    window.addEventListener('scroll', () => {
      if (robot) {
        modalMove();
      }
    });

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Limpiar event listeners
      window.removeEventListener('scroll', modalMove);
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <div className="container3d" ref={containerRef}></div>;
};

export default TD;
