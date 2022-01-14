import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Model: React.FC = () => {
  const createModel = () => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas') as HTMLCanvasElement,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 100);
    const controls = new OrbitControls(camera, renderer.domElement);

    scene.add(camera);
    camera.position.set(3, 3, 3);
    controls.enableDamping = true;

    const generateGalaxy = () => {
      const parameters = {
        count: 100000,
        size: 0.01,
        radius: 5,
        direction: 3,
        curve: 2,
        randomness: 0.2,
        randomnessPower: 3,
      };

      const geometry = new THREE.BufferGeometry();
      const position = new Float32Array(parameters.count * 3);

      for (let i = 0; i < parameters.count; i++) {
        const radius = Math.random() * parameters.radius;
        const zero2one = (i % parameters.direction) / parameters.direction;
        const directionAngle = zero2one * Math.PI * 2;
        const curveAngle = radius * parameters.curve;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 2 : -2) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        position[i * 3 + 0] = Math.cos(directionAngle + curveAngle) * radius + randomX;
        position[i * 3 + 1] = randomY;
        position[i * 3 + 2] = Math.sin(directionAngle + curveAngle) * radius + randomZ;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

      const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.render(scene, camera);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    tick();
    onResize();
    generateGalaxy();
    window.addEventListener('resize', onResize);
  };

  useEffect(() => {
    createModel();
  }, []);

  return (
    <>
      <canvas id="canvas" />
    </>
  );
}

export default Model;