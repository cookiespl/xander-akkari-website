import * as THREE from "../../modules/three.module.js";
import * as GUI from "../../modules/lil-gui.esm.js";
import * as ITEMS from "../../classes/items.js";
import { Terrain } from "../../classes/terrain.js";
import { Perlin } from "../../modules/perlin.js";

const lerp = (x, y, a) => x * (1 - a) + y * a;

class World {
    constructor(size, seg, peak, smooth, scene) {
        this.terrain = new Terrain(size, seg, peak, smooth);

        this.objects = [];
        this.meshes = [];
        this.selectedObject = undefined;

        this.guiParam = {
            currentObject: "Tree",
            terrainSize: size,
            terrainSeg: seg,
            terrainPeak: peak,
            terrainSmooth: smooth,
            time: 1
        } 

        this.CreateGUI();
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();

        // create lights
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(this.ambientLight);

        this.dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
        this.dirLight.position.x += 150;
        this.dirLight.position.y += 150;
        this.dirLight.castShadow = true;
        this.dirLight.shadow.radius = 2;
        this.dirLight.shadow.mapSize.width = 8192
        this.dirLight.shadow.mapSize.height = 8192
        this.dirLight.shadow.camera.top = this.dirLight.shadow.camera.right = 1000;
        this.dirLight.shadow.camera.bottom = this.dirLight.shadow.camera.left = -1000;
        this.dirLight.shadow.camera.near = 0.5
        this.dirLight.shadow.camera.far = 1000
        scene.add(this.dirLight);

        // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

        // // skybox
        // const cubeLoader = new THREE.CubeTextureLoader();
        // cubeLoader.setPath("../../assets/skybox/");

        // const textureCube = cubeLoader.load( "posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg")
        // this.scene.background = textureCube;

        this.scene.background = new THREE.Color(0x87CEEB);
    }

    Update() {
    }

    RegenerateTerrain() {
        this.scene.remove(this.terrain.mesh);
        this.terrain.GeneratePlane(this.guiParam.terrainSize, this.guiParam.terrainSeg)
        this.terrain.GenerateTerrain(this.guiParam.terrainPeak, this.guiParam.terrainSmooth)
        this.scene.add(this.terrain.mesh)

        var dirUp = new THREE.Vector3(0, 1, 0);
        var intersect, pos = new THREE.Vector3();

        this.objects.forEach(obj => {
            var yPos = this.guiParam.terrainPeak * (obj.lastY/obj.lastPeak);
            pos.set(obj.mainMesh.position.x, yPos, obj.mainMesh.position.z);
            intersect = { point: pos, face: { normal: dirUp } };
            obj.UpdatePosition(intersect, this)
        });

        // this.objects.forEach(obj => {
        //     var perlinY = (this.guiParam.terrainPeak * this.terrain.perlin.noise(
        //         (obj.mainMesh.position.x)/this.guiParam.terrainSmooth,
        //         (obj.mainMesh.position.z)/this.guiParam.terrainSmooth,
        //     ))
        //     console.log(perlinY)
        //     // if (perlinY < 0) {
        //     //     perlinY = -(perlinY)
        //     // }
        //     // perlinY = perlinY - 10
        //     pos.set(obj.mainMesh.position.x, perlinY, obj.mainMesh.position.z);
        //     intersect = { point: pos, face: { normal: dirUp } };
            
        // });
    }

    UpdateLighting() {
        var time = this.guiParam.time;
        var skyColor = new THREE.Color(0x87CEEB);
        var blackColor = new THREE.Color(0x000000);

        console.log(this.scene.background)
        this.scene.background = blackColor;
        this.scene.background.lerp(skyColor, time);

        this.ambientLight.intensity = lerp(0.1, 0.7, time)
        this.dirLight.intensity = lerp(0.3, 0.9, time)
    }

    CreateGUI() {
        this.gui = new GUI.GUI()
            .title('World Builder');
        this.gui.add(this.guiParam, 'currentObject', ["Tree", "Rock", "Tent", "Lantern", "Campfire"])
            .name('Selected Object');
        // this.gui.add(this.guiParam, 'terrainSize', 20, 300)
        //     .name('Terrain Size')
        //     .listen()
        //     .onChange(value => {
        //         this.RegenerateTerrain();
        //     });
        this.gui.add(this.guiParam, 'terrainPeak', 1, 100)
            .name('Terrain Peak')
            .listen()
            .onChange(value => {
                this.RegenerateTerrain();
            });
        this.gui.add(this.guiParam, 'time', 0, 1)
            .name('Time of Day')
            .listen()
            .onChange(value => {
                this.UpdateLighting();
            });
        // this.gui.add(this.guiParam, 'terrainSmooth', 1, 120)
        //     .name('Terrain Smoothing')
        //     .listen()
        //     .onChange(value => {
        //         this.RegenerateTerrain();
        //     });
    }

    CreateObject(intersect, scene) {
        var obj;
        switch (this.guiParam.currentObject) {
            case "Rock": obj = new ITEMS.Rock(intersect, scene, this); break;
            case "Tent": obj = new ITEMS.Tent(intersect, scene, this); break;
            case "Lantern": obj = new ITEMS.Lantern(intersect, scene, this); break;
            case "Campfire": obj = new ITEMS.Campfire(intersect, scene, this); break;
            default: obj = new ITEMS.Tree(intersect, scene, this); break;
        }
        this.objects.push(obj);
        this.selectedObject = obj;
    }

    SelectObjectFromMeshes(intersects) {
        var found = undefined;
        var world = this;
        for (var i = 0; i < intersects.length; i++) {
            for (var o = 0; o < this.objects.length; o++) {
                this.objects[o].mainMesh.traverse(function(mesh) {
                    console.log(intersects[i].object.uuid + " vs " + mesh.uuid)
                    if (intersects[i].object == mesh) {
                        console.log('found');
                        console.log("GOOBAH " + this)
                        world.selectedObject = world.objects[o];
                        return;
                    }
                })
            }
        }
        console.log("FAILURE");
    }

    UpdateSelectedObject(intersect, scene) {
        if (this.selectedObject != undefined)
        {
            this.selectedObject.UpdatePosition(intersect, this);
        }
    }

    DeselectObject() {
        this.selectedObject = undefined;
    }

    ObjectIsSelected() {
        return this.selectedObject != undefined;
    }

    RotateSelectedObject(amount) {
        if (this.selectedObject != undefined)
        {
            this.selectedObject.Rotate(amount);
        }
    }

}

export { World };