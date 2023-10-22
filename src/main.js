import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { LoadingManager } from 'three';

const htmlGLTFModel = document.querySelector('#gltf-model');
console.log(htmlGLTFModel)
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/gltf/');

gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/model/chair.glb', (gltf) => {
  // console.log(gltf.scenes[0].children[0]);
  // assets.setObject3D('mesh', gltf.scenes[0].children[0]);
});

function animate() {
  requestAnimationFrame(animate);
  // console.log(htmlGLTFModel.getAttribute('position'))
}

animate();

// https://raw.githubusercontent.com/WENZHELIN/AVirtualChair/main/public/model/chair.glb
// https://raw.githubusercontent.com/WENZHELIN/AVirtualChair/main/public/targets.mind

