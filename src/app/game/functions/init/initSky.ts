import { Sky } from "three/examples/jsm/objects/Sky";

import * as THREE from 'three';
import { randInt } from "three/src/math/MathUtils";

export class InitSky {
  private sky: Sky = {} as Sky;

  constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) {
    this.initSky(scene);
    this.initSun(scene, renderer, camera);
    this.initClouds(scene, camera);
  }

  initSky(scene: THREE.Scene) {
    this.sky = new Sky();
    this.sky.scale.setScalar(10000);
    scene.add(this.sky);
  }

  initSun(scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) {
    let sun = new THREE.Vector3();

    const effectController = {
      turbidity: 100,
      rayleigh: 2,
      mieCoefficient: 0.001,
      mieDirectionalG: 0.001,
      elevation: 8,
      azimuth: 280,
      exposure: renderer.toneMappingExposure,
    };

    const uniforms = this.sky.material.uniforms;
    uniforms['turbidity'].value = effectController.turbidity;
    uniforms['rayleigh'].value = effectController.rayleigh;
    uniforms['mieCoefficient'].value = effectController.mieCoefficient;
    uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
    const theta = THREE.MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(sun);

    renderer.toneMappingExposure = effectController.exposure;
    renderer.render(scene, camera);
  }

  initClouds(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    const loader = new THREE.TextureLoader();
    loader.load('assets/models/cloud.png', function onLoad(texture) {
      const smokeGeo = new THREE.PlaneGeometry(300, 200);
      let smokeMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
      });

      for (let p = 0, l = 150; p < l; p++) {
        let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
          randInt(randInt(-1900, -2990), randInt(1500, 2990)),
          randInt(-50, 1500),
          randInt(randInt(-1900, -2990), randInt(1500, 2990))
        );

        particle.lookAt(camera.position);
        particle.frustumCulled = true;
        scene.add(particle);
      }
    });
  }
}
