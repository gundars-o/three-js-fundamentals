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
/********** ADD LIGHT **********/
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight( color, intensity );
light.position.set( -1, 2, 4 );
light.target.position.set( 0, 0, 0 );
scene.add( light );
/********** CREATE ELEMENTS **********/
function makeInstance( geometry, color, x ) {
    const material = new THREE.MeshPhongMaterial( { color } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.x = x;
    return cube;
};
const cubes = [
    makeInstance( geometry, 0x44aa88,  0 )
    , makeInstance( geometry, 0x8844aa, -2 )
    , makeInstance( geometry, 0xaa8844,  2 )
];
/********** RENDER SCENE **********/
function render( time /* the time since the page loaded to function */ ) {
    time *= 0.001 /* convert time to seconds */;
    cubes.forEach( ( cube, ndx ) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        cube.rotation.x /* radians */ = rot;
        cube.rotation.y = rot;
    } );
    renderer.render( scene, camera );
    requestAnimationFrame( render );
};
requestAnimationFrame( render );
