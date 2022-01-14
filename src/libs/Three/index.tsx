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
    camera.position.set(2, 5, 5);
    controls.enableDamping = true;

    const generateGalaxy = () => {
      const parameters = {
        count: 250000,
        size: 0.01,
        radius: 5,
        direction: 4,
        curve: 1.25,
        randomness: 0.4,
        randomnessPower: 1.5,
        insideColor: 0xff6030,
        outsideColor: 0x1b3984,
      };

      const particlePosition = new Float32Array(parameters.count * 3);
      const particleColor = new Float32Array(parameters.count * 3);
      const insideColor = new THREE.Color(parameters.insideColor);
      const outsideColor = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const radius = Math.random() * parameters.radius;
        const zero2one = (i % parameters.direction) / parameters.direction;
        const directionAngle = zero2one * Math.PI * 2;
        const curveAngle = radius * parameters.curve;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 0.5 : -0.5) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        particlePosition[i * 3 + 0] = Math.cos(directionAngle + curveAngle) * radius + randomX;
        particlePosition[i * 3 + 1] = randomY;
        particlePosition[i * 3 + 2] = Math.sin(directionAngle + curveAngle) * radius + randomZ;

        const mixedColor = insideColor.clone();
        mixedColor.lerp(outsideColor, radius / parameters.radius);

        particleColor[i * 3 + 0] = mixedColor.r;
        particleColor[i * 3 + 1] = mixedColor.g;
        particleColor[i * 3 + 2] = mixedColor.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(particlePosition, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(particleColor, 3));

      const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
      });

      const points = new THREE.Points(geometry, material);
      points.rotation.set(0, 0, 45);

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