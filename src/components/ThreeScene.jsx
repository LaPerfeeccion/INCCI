import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // --- Partículas ---
    const particleCount = 180;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 12; // espacio un poco más grande
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(points);

    // --- Animación ---
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.0006;
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      points.rotation.y += 0.0009;
      points.rotation.x += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize dinámico ---
    const resizeObserver = new ResizeObserver(() => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(mount);

    return () => {
      resizeObserver.disconnect();
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="three-background" />;
};

export default ThreeScene;
