import * as THREE from "./build/three.module.js";
const canvas = document.querySelector( "#c" );
const renderer = new THREE.WebGLRenderer( { canvas } );
/********** DEFINE RENDER TARGET **********/
const rtWidth = 512;
const rtHeight = 512;
const renderTarget = new THREE.WebGLRenderTarget( rtWidth, rtHeight );
/********** DEFINE RENDER TARGET CAMERA **********/
const rtFov = 75;
const rtAspect = rtWidth / rtHeight;
const rtNear = 0.1;
const rtFar = 5;
const rtCamera = new THREE.PerspectiveCamera( rtFov, rtAspect, rtNear, rtFar );
rtCamera.position.z = 2;
/********** DEFINE RENDER TARGET SCENE **********/
const rtScene = new THREE.Scene();
rtScene.background = new THREE.Color( "red" );
/********** ADD LIGHT TO RENDER TARGET SCENE **********/
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight( color, intensity );
    light.position.set( -1, 2, 4 );
    rtScene.add( light );
};
/********** DEFINE RENDER TARGET BOX GEOMETRY **********/
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
/********** CREATE OBJECTS TO RENDER **********/
function makeInstance( geometry, color, x ) {
    const material = new THREE.MeshPhongMaterial( { color } );
    const cube = new THREE.Mesh( geometry, material );
    rtScene.add( cube );
    cube.position.x = x;
    return cube;
};
const rtCubes = [
    makeInstance( geometry, 0x44aa88,  0 )
    , makeInstance( geometry, 0x8844aa, -2 )
    , makeInstance( geometry, 0xaa8844,  2 )
];
/********** DEFINE CAMERA **********/
const fov = 75;
const aspect = 2 /* the canvas default */;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.z = 2;
/********** DEFINE SCENE **********/
const scene = new THREE.Scene();
/********** ADD LIGHT **********/
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight( color, intensity );
    light.position.set( -1, 2, 4 );
    scene.add( light );
};
/********** DEFINE MATERIAL **********/
const material = new THREE.MeshPhongMaterial( {
    map: renderTarget.texture
} );
/********** CREATE OBJECT TO RENDER AND TO USE AS A RENDER TARGET **********/
const cube = new THREE.Mesh( geometry, material );
/********** ADD RENDER TARGET TO SCENE **********/
scene.add( cube );
/********** RESIZE CANVAS IF NECESSARY **********/
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
/********** ANIMATE **********/
function render(time) {
    time *= 0.001;
    /********** RESIZE CANVAS IF NECESSARY **********/
    if ( resizeRendererToDisplaySize( renderer ) ) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    /* rotate all the cubes in the render target scene */
    rtCubes.forEach( ( cube, ndx ) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    } );
    /* draw render target scene to render target */
    renderer.setRenderTarget( renderTarget );
    renderer.render( rtScene, rtCamera );
    renderer.setRenderTarget( null );
    /* rotate the RENDER TARGET cube in the BASE scene */
    cube.rotation.x = time * 0.33;
    cube.rotation.y = time * 0.1;
    /* render the BASE scene to the canvas */
    renderer.render(scene, camera);
    /* REQUEST FOR THE NEXT RENDER */
    requestAnimationFrame(render);
};
requestAnimationFrame(render);
