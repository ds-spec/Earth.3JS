import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 5;

let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load("./maps.jpg");

let hdri = new RGBELoader();
hdri.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/buikslotermeerplein_4k.hdr",
  function (hdritexture) {
    hdritexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdritexture;
  }
);

const geometry = new THREE.SphereGeometry(2, 250, 250);
const material = new THREE.MeshPhysicalMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
