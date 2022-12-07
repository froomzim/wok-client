
import * as THREE from 'three';

export class initLights {
  constructor(scene: THREE.Scene) {
    this.start(scene);
  }

  start(scene: THREE.Scene) {
    const sunLight = new THREE.DirectionalLight(0xffffff, 5);
    sunLight.position.set(0, 100, 0);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    ambientLight.position.set(0, -3, 0);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    hemiLight.position.set(0, -3, 0);
    scene.add(hemiLight);
  }
}
