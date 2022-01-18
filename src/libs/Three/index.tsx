import { VFC, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Model: VFC = () => {
  const createModel = () => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas') as HTMLCanvasElement,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 100);
    const controls = new OrbitControls(camera, renderer.domElement);
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('assets/particle.png');
    const nebulaTexture = textureLoader.load('assets/nebula.png');

    scene.add(camera);
    camera.position.set(2, 8, 2);
    camera.scale.set(1, 1, 1.75);
    controls.enableDamping = true;

    const generateGalaxy = () => {
      const parameters = {
        count: 500000,
        size: 0.015,
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
        const directionRange = (i % parameters.direction) / parameters.direction;
        const directionAngle = directionRange * Math.PI * 2;
        const curveAngle = radius * parameters.curve;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius / 2;
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
        alphaMap: particleTexture,
      });

      const galaxy = new THREE.Points(geometry, material);
      galaxy.rotation.set(0, 150, 45);

      scene.add(galaxy);
      scene.background = nebulaTexture;
    };

    let rot = 0;
    const tick = () => {
      rot += 0.02;
      const radian = rot * Math.PI / 180;

      camera.position.x = Math.sin(radian);
      camera.position.z = Math.cos(radian);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

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