import * as THREE from "../modules/three.module.js";
import { OrbitControls } from './modules/controls/OrbitControls.js';
import { World } from "../classes/world.js";


const lerp = (x, y, a) => x * (1 - a) + y * a;
const randomRange = (max, min) => Math.random() * (max - min) + min;
const randomColor = () => Math.floor(Math.random()*16777215);

// create scene and renderer
var scene = new THREE.Scene( );
var renderer = new THREE.WebGLRenderer( );
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement );

// create camera
var ratio = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
var Pos = new THREE.Vector3(0,100,200);
camera.position.set(Pos.x,Pos.y,Pos.z);
var Dir = new THREE.Vector3(0,0,0);
camera.lookAt(Dir.x,Dir.y,Dir.z);

// create world
const world = new World(250, 100, 30, 120, scene);
scene.add(world.terrain.mesh);

// controls
var controls = new OrbitControls( camera, renderer.domElement );

// clicky clicky
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function getIntersections(event, object) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    var intersects;
    raycaster.setFromCamera(pointer, camera);
    if (object == undefined)
    {
        intersects = raycaster.intersectObjects(scene.children);
    }
    else if (Array.isArray(object))
    {
        intersects = raycaster.intersectObjects(object);
    }
    else
    {
        intersects = raycaster.intersectObject(object);
    }

    return intersects;
}

const onMouseMove = (event) => {
    const intersects = getIntersections(event, world.terrain.mesh)
    world.UpdateSelectedObject(intersects[0], scene)
    // if (intersects.length > 0) {
    //     const i2 = getIntersections(event, world.meshes)

    //     if (i2.length <= 1) {
    //         world.UpdateSelectedObject(intersects[0], scene)
    //     }
    // }
};
window.addEventListener('mousemove', onMouseMove);

const onMouseDown = (event) => {
    const intersectsObj = getIntersections(event, world.meshes);
    if (intersectsObj.length > 0)
    {
        // select existing object
        world.SelectObjectFromMeshes(intersectsObj);
    }
    else
    {
        // spawn new object
        const intersects = getIntersections(event, world.terrain.mesh);
        if (intersects.length > 0) {
            
            world.CreateObject(intersects[0], scene);
                controls.enableRotate = false;
            }
        }
    }

window.addEventListener('mousedown', onMouseDown);

const onMouseUp = (event) => {
    world.DeselectObject();
}
window.addEventListener('mouseup', onMouseUp);

// render first frame
renderer.render(scene,camera);

//this function is called when the window is resized
var MyResize = function ( )
{
    //get the new sizes
    var width = window.innerWidth;
    var height = window.innerHeight;
    //then update the renderer
    renderer.setSize(width,height);
    //and update the aspect ratio of the camera
    camera.aspect = width/height;

    //update the projection matrix given the new values
    camera.updateProjectionMatrix();

    //and finally render the scene again
    renderer.render(scene,camera);
};

//link the resize of the window to the update of the camera
window.addEventListener( 'resize', MyResize);

// check for key presses (to send command to rotate selected object)
var clock = new THREE.Clock();
const onKeyPress = (event) => {
    var code = event.code;
    var rotAmount = 0.25;
    switch (code) {
        case 'KeyQ': world.RotateSelectedObject(rotAmount); break;
        case 'KeyE': world.RotateSelectedObject(-rotAmount); break;
        default: console.log('u be pressin BUTTONS buttons...'); break;
    }
}
window.addEventListener('keypress', onKeyPress);

// update loop
var UpdateLoop = function()
{
    if (world.ObjectIsSelected())
    {
        controls.enableRotate = false;
    }
    else
    {
        controls.enableRotate = true;
    }

    world.Update();

    renderer.render(scene,camera);
    requestAnimationFrame(UpdateLoop);
}
requestAnimationFrame(UpdateLoop);