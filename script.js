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

//q: how do i make text appear when hovering over an object?




const models = [
  {
    gltf: "rum_uden_items.glb",
    link: "",
    position: [0, 0, 0],
    scale: 0.1,
  },
  {
    gltf: "skraldespand.glb",
    link: "fysik",
    position: [0, 0, 0],
    scale: 0.1,
  },
  {
    gltf: "pc.glb",
    link: "programmering",
    position: [0, 0, 0],
    scale: 0.1,
  },
  {
    gltf: "lodning.glb",
    link: "digitale",
    position: [0, 0, 0],
    scale: 0.1,
  },
  {
    gltf: "lommeregner.glb",
    link: "calculus",
    position: [0, 0, 0],
    scale: 0.1,
  }
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
camera.position.set(5, 4, 5);
camera.lookAt(new THREE.Vector3(0, 2, 0));
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
  const { gltf, scale, position, link} = modelDetails;
  loader.load(gltf, ({ scene }) => {
    scene.traverse(child => {
      //No hyperlink for the room
      if (child.gltf== "rum_uden_items.glb") {
      } else {
        child.userData.link = link;
      }

    });
    modelContainer.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(...position);
  });
});


function animate(){
  requestAnimationFrame(animate);
  
	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects(modelContainer.children);
  if (intersects.length > 0 && intersects[0].object.userData.link!=="") {
    container.style.cursor = "pointer";

    //make object emission for 5 seconds. After 5 seconds, remove glow

  } else {
    container.style.cursor = "initial"; 
    //remove glow when not hovered
  }
  
  modelContainer.children.forEach(child => {
    child.rotation.y += 0.000;
  });

  

  controls.update();  
  renderer.render(scene, camera);
}

function openSideMenu(link) {

  // Get the side menu element
  var sideMenu = document.getElementById(link);

  var sideMenus = document.getElementsByClassName("side-menu");

  // Loop through all side menus
  for (var i = 0; i < sideMenus.length; i++) {
    if ((sideMenus[i].style.display == "block") && (sideMenus[i] != sideMenu)) {
      return;
    }
  }
  // Check if the side menu is already open
  if (sideMenu.style.display === "block") {
    sideMenu.animate([
      // keyframes
      { transform: 'translateX(0%)' },
      { transform: 'translateX(-100%)' }
    ], {
      // timing options
      duration: 1000,
      easing: "ease-in-out",
      fill: "forwards"
    });
    // If the menu is already open, close it
    setTimeout(() => {
      sideMenu.style.display = "none";
    }, 1000);
  } else {
    // If the menu is closed, open it
    sideMenu.animate([
      // keyframes
      { transform: 'translateX(-100%)' },
      { transform: 'translateX(0%)' }
    ], {
      // timing options
      duration: 1000,
      easing: "ease-in-out",
      fill: "forwards"
    });


    sideMenu.style.display = "block";
  }
}



function onMouseClick() {
  raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects(modelContainer.children);
  if (intersects.length > 0) {
    const { link } = intersects[0].object.userData;
    if (link!="") {
      openSideMenu(link);
    }
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