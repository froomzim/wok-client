import { randInt } from "three/src/math/MathUtils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { Object3D } from "three";
import gsap from 'gsap';
import { ResourcesService } from "src/app/services/ui/resources.service";

export class initDefence {
  constructor(
    private resourcesServices?: ResourcesService,
  ) {
    this.start = this.start.bind(this);
    // this.resourcesServices = new ResourcesService();
  }

  start(
    path: string,
    pos: any,
    scale: any,
    rotation: number,
    name: string,
    uuid: any,
    gltfAnimations,
    mixNum: number,
    healthbars: Array<number>,
    scene: THREE.Scene,
    models: Array<THREE.Group>,
    mixer: THREE.AnimationMixer[],
    troop: Object3D,
  ) {
    let arrowNumber = randInt(10, 100);

    for (let a = 0; a < arrowNumber; a++) {
      setTimeout(() => {
        if (healthbars[uuid] > 0) {
          const gtfLoader = new GLTFLoader();
          gtfLoader.load(path, (gltf) => {
            const arrow = gltf.scene;
            arrow.name = name;
            arrow.scale.set(scale.x, scale.y, scale.z);
            arrow.rotation.y = rotation;
            arrow.position.set(pos.x, pos.y, pos.z);
            arrow.traverse((o) => {
              o.receiveShadow = true;
              o.castShadow = true;
            });
            arrow.lookAt(troop.position);
            models.push(arrow);

            scene.add(arrow);
            gsap
              .to(arrow.position, {
                duration: 1,
                x: troop.position.x + randInt(-2, 2),
                y: troop.position.y + randInt(-2, 2),
                z: troop.position.z,
                ease: 'power2.inOut',
              })
              .eventCallback('onComplete', () => {
                setTimeout(() => {
                  scene.remove(arrow);
                }, 2000);
                const box = new THREE.Box3().setFromObject(arrow);
                const box2 = new THREE.Box3().setFromObject(troop);
                if (box.intersectsBox(box2)) {
                  healthbars[troop.uuid] -= 10;
                  if (healthbars[troop.uuid] == 0) {
                    gltfAnimations.forEach((element) => {
                      if (mixer[mixNum].clipAction(element).isRunning()) {
                        mixer[mixNum].clipAction(element).fadeOut(0.5);
                      }
                    });

                    let death = mixer[mixNum].clipAction(
                      gltfAnimations.find((a) => a.name === 'death')
                    );
                    death.setDuration(2);
                    death.setEffectiveTimeScale(1);
                    death.setEffectiveWeight(1);
                    death.loop = THREE.LoopOnce;
                    death.clampWhenFinished = true;
                    death.fadeIn(0.5);
                    death.play();
                    setTimeout(() => {
                      scene.remove(troop);
                      // this.resourcesServices.subGold(randInt(0, 1000));
                      // this.resourcesServices.subWood(randInt(0, 1000));
                      // this.resourcesServices.subStone(randInt(0, 1000));
                    }, 4000);
                  }
                }
              });
          });
        }
      }, randInt(1900, 2100) * a);
    }
  }
}
