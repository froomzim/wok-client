import { Water } from 'three/examples/jsm/objects/Water';
import * as THREE from 'three';

export class initWater {
  constructor(scene: THREE.Scene) {
    this.createWater(scene);
  }

  public water: Water;

  public createWater(scene: THREE.Scene) {
    const waterGeometry = new THREE.PlaneGeometry(520, 319);
    const water = new Water(waterGeometry, {
      textureWidth: 312,
      textureHeight: 312,
      waterNormals: new THREE.TextureLoader().load(
        'assets/models/waternormals.jpg',
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 1.7,
      fog: scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = -4.2;
    water.position.x = -17;
    water.position.z = -85;
    this.water = water;
    scene.add(water);
  }
}
