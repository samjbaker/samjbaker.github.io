/*npm run dev to deploy to localhost 3000 */
import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

let camera, scene, raycaster, renderer, loader, light, controls;
let building_model;
const pointer = new THREE.Vector2();

init();
loadSTL();


function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    //camera.position.setZ(100);
    //const cameraHelper = new THREE.CameraHelper(camera);
    //scene.add(cameraHelper);
    camera.position.set(0, 0, 100)
    camera.lookAt(new THREE.Vector3(0,0,0));

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(20,20,20);
    const pointLight2 = new THREE.PointLight(0xffffff);
    pointLight2.position.set(-20,-20,20);

    scene.add(pointLight);
    scene.add(pointLight2);

    controls = new OrbitControls( camera, renderer.domElement );

    loader = new STLLoader();

    scene.background = new THREE.Color( 0xfffff0 );

    //const contourTexture = new THREE.TextureLoader().load('contours2.png');
    //scene.background = contourTexture;

    const starTexture = new THREE.TextureLoader().load('stars.jpeg');
    scene.background = starTexture;

    raycaster = new THREE.Raycaster();

    const size = 1000;
    const divisions = 100;

    //const gridHelper = new THREE.GridHelper( size, divisions );
    //scene.add( gridHelper );

    const axesHelper = new THREE.AxesHelper( 500 );
    scene.add( axesHelper );

    document.addEventListener( 'mousemove', onPointerMove );

    document.addEventListener('click', onClick, false);

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onClick(event) {
    event.preventDefault();

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( pointer, camera );

    var intersects = raycaster.intersectObjects( scene.children, true );
    /*
	if ( intersects.length > 0 ) {
	    //console.log( 'Intersection:', intersects[ 0 ] );
        if ((intersects[0].object == vinyl) || (intersects[0].object == git_logo) || (intersects[0].object == linked)){
            window.open(intersects[0].object.userData.URL)
        }
        console.log(intersects[0].object.userData)
        //window.open(intersects[0].object.userData.URL)
	}*/
}


function animate() {
    requestAnimationFrame( animate );
    controls.update();
  
    render();
}

function loadSTL() {
    loader.load( '../temp_mesh.stl', function ( geometry ) {
		const material = new THREE.MeshPhongMaterial( { color: 0x993d00, specular: 0x999999, shininess: 5, side: THREE.DoubleSide } );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.set(20, 20,0);
		mesh.rotation.set( 0, 0, Math.PI);
		mesh.scale.set( 0.05, 0.05, 0.05 );
		//mesh.castShadow = true;
		//mesh.receiveShadow = true;
		scene.add( mesh );
	} );
}
/*

function loadSTL() {
    loader.load( '../temp_mesh.stl', function ( geometry ) {
		const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, - 0.25, 0.6 );
		mesh.rotation.set( 0, - Math.PI / 2, 0 );
		mesh.scale.set( 0.5, 0.5, 0.5 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );
	} );
}


function loadSTL() {
    loader.load( './temp_mesh.stl', ( stl ) => {

        stl.scene.scale.set(8,8,8);
        stl.scene.position.set(20,0,0);
        stl.scene.rotation.y = Math.random() * 2 * Math.PI;
        stl.scene.rotation.x = Math.random() * 2 * Math.PI;
        stl.scene.rotation.z = Math.random() * 2 * Math.PI;
        scene.add( stl.scene );
        //git_logo = gltf.scene.children[2];
        //console.log(dumpObject(git_logo).join('\n'));
      
    });
}*/

function render() {

    renderer.render( scene, camera );

}

animate();