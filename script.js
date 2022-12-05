import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js";


// variables for setup
let container;
let camera;
let renderer;
let scene;
let box;
let duck;
let controls;
let intersected;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const models = [
  {
    gltf: "laptop.glb",
    link: "https://amandoee.github.io/programmering.html",
    position: [0.7, 0, 0],
    scale: 0.01,
  },
  {
    gltf: "calculus.glb",
    link: "https://amandoee.github.io/programmering.html",
    position: [-0.7, 0, 0],
    scale: 0.01,
  }/*,
  {
    gltf: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/Avocado/glTF-Binary/Avocado.glb",
    link: "https://www.youtube.com/watch?v=y6120QOlsfU",
    position: [-2, 0, 0],
    scale: 13,
  },
  {
    gltf: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/Fox/glTF-Binary/Fox.glb",
    link: "https://www.youtube.com/watch?v=izGwDsrQ1eQ",
    position: [1, 0, 0],
    scale: 0.01,
  }*/
]


function onMouseMove( event ) {
	mouse.x = ( event.clientX / container.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / container.clientHeight ) * 2 + 1;
}

container = document.querySelector('.scene');

//create scene
scene = new THREE.Scene();

const modelContainer = new THREE.Group();
scene.add(modelContainer);

const fov = 10;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 900;

// camera setup
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 5, 20);
camera.lookAt(new THREE.Vector3(0, 0, 0));
const ambient = new THREE.AmbientLight(0x404040, 3);
scene.add(ambient);


const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(10,10,30);
scene.add(light);


//renderer
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
controls = new OrbitControls (camera, renderer.domElement);

//load model
let loader = new GLTFLoader();
//let loader = new STLLoader();
models.forEach(modelDetails => {
  const { gltf, scale, position, link, rotation} = modelDetails;
  loader.load(gltf, ({ scene }) => {
    scene.traverse(child => {
      child.userData.link = link;
    });
    modelContainer.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(...position, rotation);
  });
});

function animate(){
  requestAnimationFrame(animate);
  
	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects(modelContainer.children);
  if (intersects.length > 0) {
    container.style.cursor = "pointer";
  } else {
    container.style.cursor = "initial"; 
  }
  
  modelContainer.children.forEach(child => {
    child.rotation.y += 0.01;
  });

  controls.update();  
  renderer.render(scene, camera);
}

function onMouseClick() {
  raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects(modelContainer.children);
  if (intersects.length > 0) {
    const { link } = intersects[0].object.userData;
    window.open(link, '_blank');
  }
}

function onWindowResize () {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('mousemove', onMouseMove, false);

window.addEventListener('click', onMouseClick, false);

animate();
onWindowResize();