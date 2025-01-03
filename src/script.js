import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// Remove scene.background to ensure transparency
scene.background = null;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const textTexture = textureLoader.load("./textures/matcaps/9.jpg");

// Fonts
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("18 y.o Full Stack talent's website", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  const secondTextGeometry = new TextGeometry(
    "I am super motivated dev \n looking for a full-time position",
    {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    }
  );

  textGeometry.center();
  secondTextGeometry.center();

  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: textTexture,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  const secondText = new THREE.Mesh(secondTextGeometry, textMaterial);
  scene.add(secondText);
  scene.add(text);
  text.position.y = 1;
  secondText.position.y = -1;
});

// gui.addColor(debugObject, "color").onChange(() => {
//   material.color.set(debugObject.color);
// });
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(1, 1, 1);
// scene.add(pointLight);
/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  80,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 7;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 5; // Minimum zoom distance
controls.maxDistance = 50; // Maximum zoom distance

// Optional: limit horizontal and vertical angles
controls.maxPolarAngle = Math.PI / 2; // Restrict vertical angle (e.g., to keep above ground)
controls.minPolarAngle = 0;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // Enable transparency
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
