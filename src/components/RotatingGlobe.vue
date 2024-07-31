<template>
  <div ref="canvasContainer" class="globe-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CatmullRomCurve3 } from 'three';

const canvasContainer = ref(null);

let scene, camera, renderer, sphere, particleSystem, controls, rayGroup;

onMounted(() => {
  initGlobe();
  window.addEventListener('resize', onWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
});

function initGlobe() {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight);
  canvasContainer.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 启用阻尼效果
  controls.dampingFactor = 0.05;

  // 创建地球材质
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load(import.meta.env.BASE_URL +'images/earth_texture_night.jpg'); // 替换为实际的地球纹理图片路径
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // 创建粒子系统
  createParticles();

  // 创建飞线系统
  rayGroup = new THREE.Group();
  scene.add(rayGroup);
  createFlyingLines();

  // 渲染函数
  animate();
}

function createParticles() {
  const particles = new THREE.BufferGeometry();
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015 });
  particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);
}

function createFlyingLines() {
  // 示例：创建几条飞线
  const linesData = [
    { start: new THREE.Vector3(1, 0, 0), end: new THREE.Vector3(-1, 0, 0) },
    { start: new THREE.Vector3(0.5, 0.5, 0), end: new THREE.Vector3(-0.5, -0.5, 0) },
    { start: new THREE.Vector3(-0.3, 0.8, 0), end: new THREE.Vector3(0.3, -0.8, 0) },
  ];

  linesData.forEach(({ start, end }) => {
    const curve = new CatmullRomCurve3([start, end]);
    createLine(curve);
  });
}

function createLine(curve) {
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.9 });
  const line = new THREE.Line(geometry, material);
  rayGroup.add(line);

  // 动画效果
  let progress = 0;
  function animateLine() {
    progress += 0.1;
    if (progress > 1) progress = 0;
    const start = Math.floor(progress * points.length);
    const end = start + 10;
    line.geometry.setDrawRange(start, end);
    requestAnimationFrame(animateLine);
  }
  animateLine();
}

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.002; // 地球自转速度
  particleSystem.rotation.y += 0.001; // 粒子旋转速度
  rayGroup.rotation.y += 0.002; // 飞线旋转速度
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight);
}
</script>

<style scoped>
.globe-container {
  width: 100%;
  height: 100%;
}
</style>
