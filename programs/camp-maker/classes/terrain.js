import * as THREE from "../../modules/three.module.js";
import { Perlin } from "../../modules/perlin.js";


class Terrain {
    constructor(size, subd, peak, smoothing) {
        this.mesh = undefined;

        // load textures
        var repeatNum = new THREE.Vector2(5, 5);

        this.texture = new THREE.TextureLoader().load("../../assets/grass/Grass_Texture_2_1K_Diff.jpg");
        this.texture.repeat = repeatNum;
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;

        this.textureNormal = new THREE.TextureLoader().load("../../assets/grass/Grass_Texture_1K_Nrml.jpg");
        this.textureNormal.repeat = repeatNum;
        this.textureNormal.wrapS = THREE.RepeatWrapping;
        this.textureNormal.wrapT = THREE.RepeatWrapping;

        this.textureSpecular = new THREE.TextureLoader().load("../../assets/grass/Grass_Texture_1K_Spec.jpg");
        this.textureSpecular.repeat = repeatNum;
        this.textureSpecular.wrapS = THREE.RepeatWrapping;
        this.textureSpecular.wrapT = THREE.RepeatWrapping;

        this.textureAo = new THREE.TextureLoader().load("../../assets/grass/Grass_Texture_1K_AO.jpg");
        this.textureAo.repeat = repeatNum;
        this.textureAo.wrapS = THREE.RepeatWrapping;
        this.textureAo.wrapT = THREE.RepeatWrapping;

        // generate initial terrain
        this.GeneratePerlin();
        this.GeneratePlane(size, subd);
        this.GenerateTerrain(peak, smoothing);

        this.lastPeak = 0;
    }

    GeneratePerlin() {
        this.perlin = new Perlin();
    }

    GeneratePlane(size, subd, scene) {
        // make terrain
        // color: 0x27914c
        // var texture = new THREE.TextureLoader().load("../../assets/grass/Grass_2K_diffuse.png");
        var geometry = new THREE.PlaneGeometry( size, size, subd, subd );
        var material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide});
        material.map = this.texture;
        material.normalMap = this.textureNormal;
        material.specularMap = this.textureSpecular;
        material.aoMap = this.textureAo;

        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.y = -0;
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.castShadow = false;
		this.mesh.receiveShadow = true;
        // console.log(this.mesh)
    }

    GenerateTerrain(peak, smoothing) {
        // var peak = 15;
        // var smoothing = 70;

        // alter vertices
        
        var vertices = this.mesh.geometry.attributes.position.array;
        for (var i = 0; i <= vertices.length; i += 3) {
            vertices[i+2] = peak * this.perlin.noise(
                (this.mesh.position.x + vertices[i])/smoothing, 
                (this.mesh.position.z + vertices[i+1])/smoothing
            );
        }
        this.mesh.geometry.attributes.position.needsUpdate = true;
        this.mesh.geometry.computeVertexNormals();
        // console.log(vertices)

        this.lastPeak = peak;
    }
}

export { Terrain };