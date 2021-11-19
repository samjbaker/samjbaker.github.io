/*npm run dev to deploy to localhost 3000 */
import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, raycaster, renderer, loader, light, controls;
let git_logo, vinyl, vinyl_mesh;
const pointer = new THREE.Vector2();

let INTERSECTED;

init();
loadGLTF();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.position.setZ(50);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(20,20,20);
    const pointLight2 = new THREE.PointLight(0xffffff);
    pointLight2.position.set(-20,-20,20);

    scene.add(pointLight);
    scene.add(pointLight2);

    controls = new OrbitControls( camera, renderer.domElement );

    loader = new GLTFLoader();

    //scene.background = new THREE.Color( 0xf0f0f0 );

    //const contourTexture = new THREE.TextureLoader().load('contours2.png');
    //scene.background = contourTexture;

    const starTexture = new THREE.TextureLoader().load('stars.jpeg');
    scene.background = starTexture;

    raycaster = new THREE.Raycaster();

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

	if ( intersects.length > 0 ) {
	    //console.log( 'Intersection:', intersects[ 0 ] );
        if ((intersects[0].object == vinyl) || (intersects[0].object == git_logo)){
            window.open(intersects[0].object.userData.URL)
        }
        console.log(intersects[0].object.userData)
        //window.open(intersects[0].object.userData.URL)
	}
}

function animate() {
    requestAnimationFrame( animate );
    vinyl_mesh.rotation.x += 0.001
    vinyl_mesh.rotation.y += 0.001
    vinyl_mesh.rotation.z += 0.0001
    git_logo.rotation.x += 0.001
    git_logo.rotation.y += 0.001
    git_logo.rotation.z -= 0.001
    controls.update();
  
    render();
  }


function loadGLTF() {
    loader.load( './models/github_logo.glb', ( gltf ) => {

        gltf.scene.scale.set(8,8,8);
        gltf.scene.position.set(10,12,0);

        gltf.scene.rotation.y = Math.random() * 2 * Math.PI;
        gltf.scene.rotation.x = Math.random() * 2 * Math.PI;
        gltf.scene.rotation.z = Math.random() * 2 * Math.PI;
        scene.add( gltf.scene );
        git_logo = gltf.scene.children[2];
        git_logo.userData = { URL: "http://github.com/samjbaker" }
        //console.log(dumpObject(git_logo).join('\n'));
      
    });

    loader.load( './models/whitelabel.glb', function ( gltf ) {

        //gltf.scene.position.set(0,-10,10)
        gltf.scene.scale.set(14,14,14);
        gltf.scene.position.set(-10,-10,-30);

        gltf.scene.rotation.y = Math.random() * 2 * Math.PI;
        gltf.scene.rotation.x = Math.random() * 2 * Math.PI;
        gltf.scene.rotation.z = Math.random() * 2 * Math.PI;
        scene.add( gltf.scene );
        vinyl_mesh = gltf.scene;
        vinyl = gltf.scene.children[6].children[0].children[0];
        vinyl.userData = { URL: "http://www.google.com" }
        //vinyl = gltf.scene.getObjectByName('Rotater_Empty');
        //vinyl.userData.URL = "http://www.google.com"
      
        console.log(dumpObject(vinyl).join('\n'));
      }, undefined, function ( error ) {
      
          console.error( error );
      
      } );
    /*
    for ( let i = 0; i < 50; i++ ) {

        loader.load( './models/github_logo.glb', ( gltf ) => {

            //gltf.scene.position.set(0,-10,10)
            gltf.scene.scale.set(8,8,8);
            gltf.scene.position.x = Math.random() * 600 - 400;
            gltf.scene.position.y = Math.random() * 600 - 400;
            gltf.scene.position.z = Math.random() * 600 - 400;
    
            gltf.scene.rotation.y = Math.random() * 2 * Math.PI;
            gltf.scene.rotation.x = Math.random() * 2 * Math.PI;
            gltf.scene.rotation.z = Math.random() * 2 * Math.PI;

            scene.add( gltf.scene );
            console.log(dumpObject(gltf.scene).join('\n'));
          
        });

        loader.load( './models/whitelabel.glb', function ( gltf ) {

            //gltf.scene.position.set(0,-10,10)
            gltf.scene.scale.set(14,14,14);
            gltf.scene.position.x = Math.random() * 600 - 400;
            gltf.scene.position.y = Math.random() * 600 - 400;
            gltf.scene.position.z = Math.random() * 600 - 400;
    
            gltf.scene.rotation.y = Math.random() * 2 * Math.PI;
            gltf.scene.rotation.x = Math.random() * 2 * Math.PI;
            gltf.scene.rotation.z = Math.random() * 2 * Math.PI;

            gltf.userData = {
                URL: "http://www.google.com"
            };
            scene.add( gltf.scene );
          
          }, undefined, function ( error ) {
          
              console.error( error );
          
          } );

    }
    */
}

function render() {

    raycaster.setFromCamera( pointer, camera );

	const intersects = raycaster.intersectObjects( scene.children, true );

	if ( intersects.length > 0 ) {

	if ( INTERSECTED != intersects[ 0 ].object ) {

	    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

	    	INTERSECTED = intersects[ 0 ].object;
	    	INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
	    	INTERSECTED.material.emissive.setHex( 0x0099ff );

	    }

	} else {

		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

		INTERSECTED = null;

	}

    renderer.render( scene, camera );

}

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
  }

  animate();