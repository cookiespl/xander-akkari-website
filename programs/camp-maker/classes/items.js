import * as THREE from "../modules/three.module.js";
import { GLTFLoader } from "../modules/loaders/GLTFLoader.js";
import { World } from "./world.js";

class Item {
    constructor() {
        this.spinAmount = 0;
        this.lastY = 0;
        this.lastPeak = 0;
    }

    UpdatePosition(intersect, world) {
        // console.log('...boys?')

        this.mainMesh.position.x = intersect.point.x;
        this.mainMesh.position.y = intersect.point.y;
        this.mainMesh.position.z = intersect.point.z;

        this.lastY = this.mainMesh.position.y;
        this.lastPeak = world.guiParam.terrainPeak;
    }

    Rotate(amount) {
        console.log('MMMM rotate ' + amount)
        this.spinAmount += amount;
        this.mainMesh.rotation.y += amount;
    }
}

class Tree extends Item {
    constructor(intersect, scene, world) {
        super()

        var items = ['tree1'];
        var sizes = [0.15];

        var r = Math.floor(Math.random()*items.length)
        var s = items[r];
        var size = sizes[r];

        const loader = new GLTFLoader();
        loader.load('../assets/' + s + '/scene.gltf', (gltfScene) => {

            gltfScene.scene.castShadow = true;
            gltfScene.scene.recieveShadow = true;
            gltfScene.scene.scale.x = size;
            gltfScene.scene.scale.y = size;
            gltfScene.scene.scale.z = size;
            scene.add(gltfScene.scene)
            
            this.mainMesh = gltfScene.scene;

            // console.log(this.mainMesh)
            // console.log(world)

            gltfScene.scene.traverse(function(obj) {
                if (obj.isMesh) {
                    world.meshes.push(obj)
                    obj.castShadow = true;
                    obj.recieveShadow = true;
                }
            });

            this.UpdatePosition(intersect, world);
        })
        // console.log(this.mainMesh)

        this.UpdatePosition = function(intersect, world) {
            // console.log('tree code')
            // console.log(this.mainMesh)
    
            if (this.mainMesh != undefined)
            {
                this.mainMesh.position.x = intersect.point.x;
                this.mainMesh.position.y = intersect.point.y;
                this.mainMesh.position.z = intersect.point.z;

                this.mainMesh.rotation.y = this.spinAmount;

                this.lastY = this.mainMesh.position.y;
                this.lastPeak = world.guiParam.terrainPeak;
            }
        }
    }
}

class Rock extends Item {
    constructor(intersect, scene, world) {
        super()

        var items = ['rock1'];
        var sizes = [0.15];

        var r = Math.floor(Math.random()*items.length)
        var s = items[r];
        var size = sizes[r];

        const loader = new GLTFLoader();
        loader.load('../assets/' + s + '/scene.gltf', (gltfScene) => {

            gltfScene.scene.castShadow = true;
            gltfScene.scene.recieveShadow = true;
            gltfScene.scene.scale.x = size;
            gltfScene.scene.scale.y = size;
            gltfScene.scene.scale.z = size;
            scene.add(gltfScene.scene)
            
            this.mainMesh = gltfScene.scene;

            // console.log(this.mainMesh)
            // console.log(world)

            gltfScene.scene.traverse(function(obj) {
                if (obj.isMesh) {
                    world.meshes.push(obj)
                    obj.castShadow = true;
                    obj.recieveShadow = true;
                }
            });

            this.UpdatePosition(intersect, world);
        })
        // console.log(this.mainMesh)

        this.UpdatePosition = function(intersect, world) {
            // console.log('tree code')
            // console.log(this.mainMesh)
    
            if (this.mainMesh != undefined)
            {
                this.mainMesh.position.x = intersect.point.x;
                this.mainMesh.position.y = intersect.point.y;
                this.mainMesh.position.z = intersect.point.z;

                this.mainMesh.rotation.y = this.spinAmount;

                this.lastY = this.mainMesh.position.y;
                this.lastPeak = world.guiParam.terrainPeak;
            }
        }
    }
}

class Tent extends Item {
    constructor(intersect, scene, world) {
        super()

        var items = ['tent'];
        var sizes = [10];

        var r = Math.floor(Math.random()*items.length)
        var s = items[r];
        var size = sizes[r];

        const loader = new GLTFLoader();
        loader.load('../assets/' + s + '/scene.gltf', (gltfScene) => {

            gltfScene.scene.castShadow = true;
            gltfScene.scene.recieveShadow = true;
            gltfScene.scene.scale.x = size;
            gltfScene.scene.scale.y = size;
            gltfScene.scene.scale.z = size;
            scene.add(gltfScene.scene)
            
            this.mainMesh = gltfScene.scene;

            // console.log(this.mainMesh)
            // console.log(world)

            gltfScene.scene.traverse(function(obj) {
                if (obj.isMesh) {
                    world.meshes.push(obj)
                    obj.castShadow = true;
                    obj.recieveShadow = true;
                }
            });

            this.UpdatePosition(intersect, world);
        })
        console.log(this.mainMesh)

        this.UpdatePosition = function(intersect, world) {
            // console.log('tree code')
            // console.log(this.mainMesh)
    
            if (this.mainMesh != undefined)
            {
                this.mainMesh.position.x = intersect.point.x;
                this.mainMesh.position.y = intersect.point.y;
                this.mainMesh.position.z = intersect.point.z;

                // var pos = new THREE.Vector3()
                // var rot = new THREE.Vector3(intersect.face.normal.x, intersect.face.normal.y, intersect.face.normal.z)
                // // console.log(rot)
                // this.mainMesh.lookAt(pos.addVectors(rot, this.mainMesh.position))

                // this.mainMesh.rotation.y += this.spinAmount;

                this.lastY = this.mainMesh.position.y;
                this.lastPeak = world.guiParam.terrainPeak;

                this.mainMesh.position.y += 5;
            }
        }
    }
}

class Lantern extends Item {
    constructor(intersect, scene, world) {
        super()

        var items = ['lantern'];
        var sizes = [0.015];

        var r = Math.floor(Math.random()*items.length)
        var s = items[r];
        var size = sizes[r];

        const loader = new GLTFLoader();
        loader.load('../assets/' + s + '/scene.gltf', (gltfScene) => {

            gltfScene.scene.castShadow = true;
            gltfScene.scene.recieveShadow = true;
            gltfScene.scene.scale.x = size;
            gltfScene.scene.scale.y = size;
            gltfScene.scene.scale.z = size;
            scene.add(gltfScene.scene)
            
            this.mainMesh = gltfScene.scene;

            // console.log(this.mainMesh)
            // console.log(world)

            gltfScene.scene.traverse(function(obj) {
                if (obj.isMesh) {
                    world.meshes.push(obj)
                    // obj.castShadow = true;
                    // obj.recieveShadow = true;
                }
            });

            this.UpdatePosition(intersect, world);
        })
        // console.log(this.mainMesh)

        var light = new THREE.PointLight(0xffffdd, 1, 80);
        light.castShadow = true;
        light.shadow.mapSize.width = 512
        light.shadow.mapSize.height = 512
        light.shadow.camera.near = 0.5
        light.shadow.camera.far = 100
        this.light = light;
        scene.add(this.light);

        this.UpdatePosition = function(intersect, world) {
            if (this.mainMesh != undefined)
            {
                // console.log('lantern code')
                this.mainMesh.position.x = intersect.point.x + 1;
                this.mainMesh.position.y = intersect.point.y;
                this.mainMesh.position.z = intersect.point.z - 1;

                this.mainMesh.rotation.y = this.spinAmount;

                this.light.position.x = this.mainMesh.position.x;
                this.light.position.y = this.mainMesh.position.y + 5;
                this.light.position.z = this.mainMesh.position.z;

                // console.log(this.light)

                this.lastY = this.mainMesh.position.y;
                this.lastPeak = world.guiParam.terrainPeak;

                this.mainMesh.position.x -= 1;
                this.mainMesh.position.z += 1;
            }
        }

        this.UpdatePosition(intersect, world);
    }
}

class Campfire extends Item {
    constructor(intersect, scene, world) {
        super()

        var items = ['campfire'];
        var sizes = [1];

        var r = Math.floor(Math.random()*items.length)
        var s = items[r];
        var size = sizes[r];

        const loader = new GLTFLoader();
        loader.load('../assets/' + s + '/scene.gltf', (gltfScene) => {

            gltfScene.scene.castShadow = true;
            gltfScene.scene.recieveShadow = true;
            gltfScene.scene.scale.x = size;
            gltfScene.scene.scale.y = size;
            gltfScene.scene.scale.z = size;
            scene.add(gltfScene.scene)
            
            this.mainMesh = gltfScene.scene;

            // console.log(this.mainMesh)
            // console.log(world)

            gltfScene.scene.traverse(function(obj) {
                if (obj.isMesh) {
                    world.meshes.push(obj)
                    // obj.castShadow = true;
                    // obj.recieveShadow = true;
                }
            });

            this.UpdatePosition(intersect, world);
        })
        // console.log(this.mainMesh)

        var light = new THREE.PointLight(0xFFA500, 3, 120);
        light.castShadow = true;
        light.shadow.mapSize.width = 512
        light.shadow.mapSize.height = 512
        light.shadow.camera.near = 0.5
        light.shadow.camera.far = 100
        this.light = light;
        scene.add(this.light);

        this.UpdatePosition = function(intersect, world) {
            if (this.mainMesh != undefined)
            {
                // console.log('lantern code')
                this.mainMesh.position.x = intersect.point.x + 1;
                this.mainMesh.position.y = intersect.point.y;
                this.mainMesh.position.z = intersect.point.z - 1;

                this.mainMesh.rotation.y = this.spinAmount;

                this.light.position.x = this.mainMesh.position.x;
                this.light.position.y = this.mainMesh.position.y + 5;
                this.light.position.z = this.mainMesh.position.z;

                // console.log(this.light)

                this.lastY = this.mainMesh.position.y;
                this.lastPeak = world.guiParam.terrainPeak;

                this.mainMesh.position.x -= 1;
                this.mainMesh.position.z += 1;
            }
        }

        this.UpdatePosition(intersect, world);
    }
}

export { Item, Tree, Rock, Tent, Lantern, Campfire };