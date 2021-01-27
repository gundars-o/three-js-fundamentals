import * as THREE from './build/three.module.js';
/********** RENDERER **********/
const canvas = document.querySelector( '#c' );
const renderer = new THREE.WebGLRenderer( { canvas } );
/********** CAMERA **********/
const fov = 75;
const aspect = 2; /* the canvas default */
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.z = 2;
/********** SCENE **********/
const scene = new THREE.Scene();
/********** GEOMETRY **********/
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
/********** MATERIAL **********/
const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } );
/********** CREATE ELEMENT **********/
const cube = new THREE.Mesh( geometry, material );
/********** ADD TO SCENE **********/
scene.add( cube );
/********** RENDER SCENE **********/
function render( time /* the time since the page loaded to function */ ) {
    time *= 0.001 /* convert time to seconds */;
    cube.rotation.x /* radians */ = time;
    cube.rotation.y = time;
    renderer.render( scene, camera );
    requestAnimationFrame( render );
};
requestAnimationFrame( render );
