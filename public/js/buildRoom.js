import {OBJLoader2} from "./three.js-master/examples/jsm/loaders/OBJLoader2.js"
import {MTLLoader} from './three.js-master/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from './three.js-master/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

const wallHeight = 3;
const shortWallLength = 8;
const longWallLength = 13;

const wireWidth = .01;
const wireLength = .5;
const bulbRadius = .15; 

const textureLoader = new THREE.TextureLoader();

function buildRoom(scene) {
    addWalls(scene);
    addPaintings(scene);
    addStatues(scene);
    addModernArt(scene);
    addLights(scene);
}

function addWalls(scene) {
    const shortWallGeometry = new THREE.PlaneGeometry( shortWallLength, wallHeight );
	const longWallGeometry = new THREE.PlaneGeometry( longWallLength, wallHeight );
    const floorGeometry = new THREE.PlaneGeometry( longWallLength, shortWallLength)
    const pillarGeometry = new THREE.BoxGeometry(shortWallLength / 4, wallHeight, shortWallLength / 4);
    
	const longWallMaterial = new THREE.MeshPhongMaterial( {color: 0xC0C0C0, side: THREE.DoubleSide} );
	const shortWallMaterial = new THREE.MeshPhongMaterial( {color: 0xFF0000, side: THREE.DoubleSide} );
	const floorMaterial = new THREE.MeshPhongMaterial( {color: 0x00FF00, side: THREE.DoubleSide} );
	const pillarMaterial = new THREE.MeshPhongMaterial( { color: 0x00ffff, side: THREE.DoubleSide } );

	const farWall = new THREE.Mesh( shortWallGeometry, shortWallMaterial );
	farWall.translateY(wallHeight / 2);
	farWall.translateZ(longWallLength / -2);
    farWall.receiveShadow = true;
	
	const backWall = new THREE.Mesh( shortWallGeometry, shortWallMaterial );
	backWall.translateY(wallHeight / 2);
    backWall.translateZ(longWallLength / 2);
    
	const leftWall = new THREE.Mesh( longWallGeometry, longWallMaterial );
	leftWall.translateY(wallHeight / 2);
	leftWall.translateX(shortWallLength / -2);
	leftWall.rotateY(Math.PI / 2)
	
	const rightWall = new THREE.Mesh( longWallGeometry, longWallMaterial );
	rightWall.translateY(wallHeight / 2);
	rightWall.translateX(shortWallLength / 2);
	rightWall.rotateY(Math.PI / 2)

    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.receiveShadow = true;
	floor.rotateX(Math.PI / 2)
	floor.rotateZ(Math.PI / 2)

	const ceiling = new THREE.Mesh( floorGeometry, floorMaterial );
	ceiling.translateY(wallHeight)
	ceiling.rotateX(Math.PI / 2)
    ceiling.rotateZ(Math.PI / 2)
    
    const pillar = new THREE.Mesh( pillarGeometry, pillarMaterial );
    pillar.translateY(wallHeight / 2)
    
    scene.add( farWall );
	scene.add( leftWall );
	scene.add( rightWall );
	scene.add( backWall );
	scene.add( floor );
	scene.add( ceiling );
    // scene.add( pillar );
}

function addPaintings(scene) {
    const paintingGeometry = new THREE.PlaneGeometry(2, 2);
    const paintingGeometry2 = new THREE.PlaneGeometry(5, 2.5);

    const paintingMaterial = new THREE.MeshBasicMaterial( {color: 0x0000FF, side: THREE.DoubleSide} );
    const sunflowersMaterial = new THREE.MeshPhongMaterial({map: textureLoader.load('resources/sunflowers.jpg'), side: THREE.DoubleSide})
    const guernicaMaterial = new THREE.MeshPhongMaterial({map: textureLoader.load('resources/guernica.jpg'), side: THREE.DoubleSide})

    const painting1 = new THREE.Mesh(paintingGeometry, sunflowersMaterial);
    painting1.translateX(shortWallLength / -2 + .01)
    painting1.translateZ(longWallLength / -3);
    painting1.translateY(1.5);
    painting1.rotateY(Math.PI / 2);

    const painting2 = new THREE.Mesh(paintingGeometry2, guernicaMaterial);
    painting2.translateX(shortWallLength / -2 + .01)
    painting2.translateZ(longWallLength / 5);
    painting2.translateY(1.5)
    painting2.rotateY(Math.PI / 2);

    scene.add( painting1 );
    scene.add( painting2 );
}

function addStatues(scene) {
    const vaseLoader = new OBJLoader2();
    const statueOneLoader = new OBJLoader2();
    const statueTwoLoader = new OBJLoader2();
    const davidLoader = new OBJLoader2();

    const statueOneMtlLoader = new MTLLoader();
    const statueTwoMtlLoader = new MTLLoader();

    davidLoader.load('resources/david.obj', (statue) => {
        statue.scale.set(.35, .35, .35);
        statue.translateZ(-longWallLength + 6.25);
        statue.translateX(shortWallLength / 2 + 2.75);
        statue.rotateY(Math.PI / -4);
        scene.add(statue);
    });

    // const vaseMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    // const bumpMap = textureLoader.load('resources/vase/varillnew_low_lambert1_normal.png');
    // vaseMaterial.bumpMap = bumpMap;
    // vaseLoader.addMaterials(vaseMaterial);
    // vaseLoader.load('resources/vase/vasee.obj', (vase) => {
    //     vase.scale.set(.15, .15, .15);
    //     vase.castShadow = true;
    //     vase.translateX(1);
    //     vase.materials = vaseMaterial;

    //     scene.add(vase);
    // });
    // statueOneMtlLoader.load('resources/statue_one/mm_artdeco_sculpture_01.mtl', (mtlParseResult) => {
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     statueOneLoader.addMaterials(materials);
    //     statueOneLoader.load('resources/statue_one/mm_artdeco_sculpture_01.obj', (statue) => {
    //         statue.scale.set(.015, .015, .015);
    //         statue.translateZ(1);
    //         scene.add(statue);
    //     });
    // })
    statueTwoMtlLoader.load('resources/statue_two/Textures/Thai_Female_Sandstone_V2.2.mtl', (mtlParseResult) => {
        const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        statueTwoLoader.addMaterials(materials);
        statueTwoLoader.load('resources/statue_two/Thai_Female_Sandstone_V2.2.obj', (statue) => {
            statue.scale.set(4, 4, 4);
            statue.translateZ(longWallLength / 5);
            statue.translateX(shortWallLength / 2 - .5)
            statue.rotateY(Math.PI / -2);
            scene.add(statue);
        });
    })
}

function addModernArt(scene) {
    function paramterization( u, t, target ) {

		// this is a mobius strip with constant modifications

		u *= Math.PI;
		t *= 2 * Math.PI;

		u = u * 2;
		var phi = u / 2;
		var major = 2.25, a = 0.5, b = 2;

		var x, y, z;

		x = a * Math.cos( t ) * Math.cos( phi ) - b * Math.sin( t * .7 ) * Math.sin( phi );
		z = a * Math.cos( t ) * Math.sin( phi ) + b * Math.sin( t ) * Math.cos( phi * 3 );
		y = ( major + x ) * Math.sin( u * .8 );
		x = ( major + x ) * Math.cos( u );

		target.set( x, y, z );

	}

    const sculptureGeometry = new THREE.ParametricGeometry(paramterization, 100, 100);
    const standX = .5;
    const standY = .5;
    const standZ = .5;
    const sculptureStandGeometry = new THREE.BoxGeometry(standX, standY, standZ);

    const sculptureMaterial = new THREE.MeshStandardMaterial( {color: 0x5ccece, side: THREE.DoubleSide, metalness: 1.0, roughness: .5, emissive: 0x534b6c });
    const sculptureStandMaterial = new THREE.MeshPhongMaterial( {color: 0xa0a0a0} );

    const sculptureMesh = new THREE.Mesh(sculptureGeometry, sculptureMaterial);
    sculptureMesh.scale.set(.1, .2, .1)
    // const sculptureBoundingBox = new THREE.Box3().setFromObject(sculptureMesh);
    // const sculptureBoxDimmensions = new THREE.Vector3();
    // sculptureBoundingBox.getSize(sculptureBoxDimmensions)
    sculptureMesh.translateY(.82 + standY);
    sculptureMesh.translateX(-.2)
    sculptureMesh.rotateZ(Math.PI);
    sculptureMesh.castShadow = true;

    const sculptureStandMesh = new THREE.Mesh(sculptureStandGeometry, sculptureStandMaterial);
    sculptureStandMesh.translateY(standY / 2);
    sculptureStandMesh.castShadow = true;

    const sculptureAndStand = new THREE.Group();
    sculptureAndStand.add(sculptureMesh);
    sculptureAndStand.add(sculptureStandMesh);

    sculptureAndStand.translateZ(longWallLength * .9 / -2);

    scene.add(sculptureAndStand);
}

function addLights(scene) {
    const ambientLight = new THREE.AmbientLight( 0xffffff, .8 ); 
    
    const pointLight1 = new THREE.PointLight( 0xffffff, .7, 9 );
    pointLight1.castShadow = true;
    
    
    const wireGeometry = new THREE.CylinderGeometry(wireWidth, wireWidth, wireLength);
    const bulbGeometry = new THREE.SphereGeometry(bulbRadius);
    
    const wireMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const bulbMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    wire.translateY(wallHeight - (wireLength / 2))

    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial)
    pointLight1.add(bulb)
    pointLight1.translateY(wallHeight - wireLength - bulbRadius);
    
    const hangingLight = new THREE.Group();
    hangingLight.add(wire);
    hangingLight.add(pointLight1);
    
    const hangingLight2 = hangingLight.clone();
    hangingLight2.translateX(shortWallLength / 4);
    hangingLight2.translateZ(longWallLength / -5);
    
    const hangingLight3 = hangingLight.clone();
    hangingLight3.translateX(shortWallLength / 4);
    hangingLight3.translateZ(longWallLength / 5);
    
    const hangingLight4 = hangingLight.clone();
    hangingLight4.translateX(shortWallLength / -4);
    hangingLight4.translateZ(longWallLength / 5);
    
    
    hangingLight.translateX(shortWallLength / -4);
    hangingLight.translateZ(longWallLength / -5);
    
    scene.add( hangingLight );
    scene.add( hangingLight2 );
    scene.add( hangingLight3 );
    scene.add( hangingLight4 );
    // scene.add( ambientLight );
}

export {buildRoom}