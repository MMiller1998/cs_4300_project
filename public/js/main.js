import {FirstPersonControls} from "./three.js-master/examples/jsm/controls/FirstPersonControls.js"
import {buildRoom} from "./buildRoom.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, .1, 100 );
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 2;
camera.position.y = .8
camera.rotateY(Math.PI)
// camera.rotateX(Math.PI / 30)

const controls = new FirstPersonControls(camera, renderer.domElement);
controls.lookVertical = false;

function animate() {
	// tempCube.rotation.x += .02;
	// tempCube.rotation.y += .02;
	controls.update(clock.getDelta());
	requestAnimationFrame( animate );
	renderer.shadowMap.enabled = true;
	renderer.render( scene, camera );
}

buildRoom(scene);

// const tempCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({color: 0x0000ff}));
// scene.add(tempCube);

animate();