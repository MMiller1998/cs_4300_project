import {FirstPersonControls} from "./three.js-master/examples/jsm/controls/FirstPersonControls.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

camera.position.z = 5;

const controls = new FirstPersonControls(camera, renderer.domElement);

function animate() {
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	controls.update(clock.getDelta());
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();