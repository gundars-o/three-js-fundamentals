import * as THREE from './build/three.module.js';
/********** CREATE RENDERER **********/
const canvas = document.querySelector( '#c' );
const renderer = new THREE.WebGLRenderer( {canvas} );
/********** CREATE CAMERA **********/
const fov = 40;
const aspect = 2 /* the canvas defaul */;
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
    scene.add( light );
};
  /**********************************************/
 /********** CREATE OBJECTS TO RENDER **********/
/**********************************************/
const objects = [] /* an array of objects whose rotation to update */;
/********** DEFINE SPHERE GEOMETRY **********/
const radius = 1 /* use just one sphere for everything */;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereBufferGeometry( radius, widthSegments, heightSegments );
/********** ADD SOLAR SYSTEM **********/
const solarSystem = new THREE.Object3D();
scene.add( solarSystem );
objects.push( solarSystem );
/********** ADD SUN **********/
const sunMaterial = new THREE.MeshPhongMaterial( { emissive: 0xFFFF00 } );
const sunMesh = new THREE.Mesh( sphereGeometry, sunMaterial );
sunMesh.scale.set( 5, 5, 5 ) /* make the sun large */;
solarSystem.add( sunMesh );
objects.push( sunMesh );
/********** ADD EARTH ORBIT **********/
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add( earthOrbit );
objects.push( earthOrbit );
/********** ADD EARTH **********/
const earthMaterial = new THREE.MeshPhongMaterial( { color: 0x2233FF, emissive: 0x112244 } );
const earthMesh = new THREE.Mesh( sphereGeometry, earthMaterial );
earthOrbit.add( earthMesh );
objects.push( earthMesh );
/********** ADD MOON ORBIT**********/
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add( moonOrbit );
/********** ADD MOON **********/
const moonMaterial = new THREE.MeshPhongMaterial( { color: 0x888888, emissive: 0x222222 } );
const moonMesh = new THREE.Mesh( sphereGeometry, moonMaterial );
moonMesh.scale.set( 0.5, 0.5, 0.5 );
moonOrbit.add( moonMesh );
objects.push( moonMesh );
/********** AxesHelper to each node **********/
objects.forEach( ( node ) => {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add( axes );
} );
/********** RENDERER SIZE **********/
function resizeRendererToDisplaySize( renderer ) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {
        renderer.setSize( width, height, false );
    };
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
