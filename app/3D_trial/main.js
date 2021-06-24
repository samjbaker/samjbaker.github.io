import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

const geometry = new THREE.TorusKnotGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial({ color: 0xcc00cc });
const material2 = new THREE.MeshStandardMaterial({ color: 0xF9FF3C });
const torus = new THREE.Mesh( geometry, material );
const torus2 = new THREE.Mesh( geometry, material2 );
torus.position.set(12,12,12);
torus2.position.set(10,10,3);

scene.add(torus);
scene.add(torus2);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(-20,-20,20);

scene.add(pointLight);
scene.add(pointLight2);

/*
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);


const lightHelper = new THREE.PointLightHelper( pointLight );

scene.add(lightHelper);


const gridHelper = new THREE.GridHelper( 2000, 500 );

scene.add(gridHelper);
*/

const controls = new OrbitControls( camera, renderer.domElement );

function addJunk() {
  const size = THREE.MathUtils.randFloatSpread( 2 );
  const geometry = new THREE.SphereGeometry(size, 24, 24);
  const material = new THREE.MeshBasicMaterial( { color: 0x04235c });
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addJunk);
/*
const contourTexture = new THREE.TextureLoader().load('contours2.png');
scene.background = contourTexture;
*/
const white = new THREE.Color(0xffffff);

scene.background = white;

//Me!
const samTexture = new THREE.TextureLoader().load('crouch.jpg')

const sam = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial( {map: samTexture })
);

sam.position.set(-20,-10,0)

scene.add(sam);

//Adding github model from blender
const loader = new GLTFLoader();

loader.load( './models/github_logo.glb', function ( gltf ) {

  //gltf.position.set(0,-10,10)
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

//Renders the scene and updates objects position and rotation 
function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  torus2.rotation.x += 0.01
  torus2.rotation.y += 0.05
  //torus2.rotation.z += 0.01

  if(torus2.position.x < 80){
    torus2.position.x += 0.1
  }
  else {
    torus2.position.x = -80
  }
    
  controls.update();

  renderer.render( scene, camera );
}

animate();