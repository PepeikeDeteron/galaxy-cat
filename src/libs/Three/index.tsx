import React, { useEffect } from 'react';
import * as THREE from 'three';

const Model: React.FC = () => {
  const createModel = () => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas') as HTMLCanvasElement,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1 / 1);
    camera.position.set(0, 0, 1000);

    let rot = 0;

    const tick = () => {
      rot += 0.1;

      const radian = (rot * Math.PI) / 180;

      camera.position.x = 1000 * Math.sin(radian);
      camera.position.z = 1000 * Math.cos(radian);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

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

    const createStarField = () => {
      const size = 3000;
      const length = 1000;
      const vertices = [];

      for (let i = 0; i < length; i++) {
        const x = size * (Math.random() - 0.5);
        const y = size * (Math.random() - 0.5);
        const z = size * (Math.random() - 0.5);

        vertices.push(x, y, z);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({
        size: 5,
        color: 0xffffff,
      });

      const mesh = new THREE.Points(geometry, material);
      scene.add(mesh);
    };

    tick();
    onResize();
    createStarField();
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