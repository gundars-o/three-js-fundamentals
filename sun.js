import * as THREE from './build/three.module.js';
/********** CREATE RENDERER **********/
const canvas = document.querySelector( '#c' );
const renderer = new THREE.WebGLRenderer( {canvas} );
/********** CREATE CAMERA **********/
const fov = 40;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.set( 0, 50, 0 );
camera.up.set( 0, 0, 1 );
camera.lookAt( 0, 0, 0 );
/********** CREATE SCENE **********/
const scene = new THREE.Scene();
{ /********** ADD LIGHT **********/
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight( color, intensity );
    scene.add(light);
}
/********** CREATE OBJECTS TO RENDER **********/
const objects = [] /* an array of objects whose rotation to update */;
const radius = 1 /* use just one sphere for everything */;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereBufferGeometry( radius, widthSegments, heightSegments );
const sunMaterial = new THREE.MeshPhongMaterial( { emissive: 0xFFFF00 } );
const sunMesh = new THREE.Mesh( sphereGeometry, sunMaterial );
sunMesh.scale.set( 5, 5, 5 ) /* make the sun large */;
scene.add( sunMesh );
objects.push( sunMesh );
/********** RENDERER SIZE **********/
function resizeRendererToDisplaySize( renderer ) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {
        renderer.setSize( width, height, false );
    }
    return needResize;
};
/********** ANIMATE AND RENDER **********/
function render( time ) {
    time *= 0.001;
    if ( resizeRendererToDisplaySize( renderer ) ) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    };
    objects.forEach( ( obj ) => {
      obj.rotation.y = time;
    } );
    renderer.render( scene, camera );
    requestAnimationFrame( render );
};
requestAnimationFrame( render );