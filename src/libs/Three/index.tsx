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

    // Three.js 動作確認用
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);

    scene.add(box);

    const tick = () => {
      box.rotation.y += 0.01;

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