import { GameService } from "src/app/services/game/game.service";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { randInt } from "three/src/math/MathUtils";
import * as THREE from 'three';
import { moveNpc } from "./moveNpc";
import { initDefence } from "../init/initDefence";

export class Attack {
  public healthbars: Array<number> = [];
  private readonly service: GameService;

  constructor(
  ) {
    this.service = new GameService();
  }

  attack(models, scene, mixer: Array<THREE.AnimationMixer>, navmesh) {
    this.service.setIsUnderAttacking(true);
    // this.meshEvents('entrance');
    // this.hiddenWaypoints();
    this.service.setIsFocused(true);

    let loops = 2;

    for (let i = 0; i < loops; i++) {

      const atkNum = randInt(1, 5);
      setTimeout(() => {
        let posA = new Vector3(
          8.9, -1.78, 80.34
        );

        const gtfLoader = new GLTFLoader();
        gtfLoader.load('assets/models/scene.gltf', (gltf7) => {
          const model = gltf7.scene;
          model.animations = gltf7.animations;
          const animations = new Map();
          const mix = new THREE.AnimationMixer(model);
          const idleAction = mix.clipAction(model.animations.find((a) => a.name === 'idle'));
          idleAction.play();
          idleAction.enabled = false;

          const runAction = mix.clipAction(model.animations.find((a) => a.name === 'run'));
          runAction.play();
          runAction.enabled = false;

          const attackAction = mix.clipAction(model.animations.find((a) => a.name === 'attack' + atkNum));
          attackAction.play();
          attackAction.enabled = false;

          animations.set('idle', idleAction);
          animations.set('run', runAction);
          animations.set('attack', attackAction);

          let uuid = gltf7.scene.uuid;
          this.healthbars[uuid] = 100;
          model.scale.set(0.08, 0.08, 0.08);
          model.rotation.y = 9.5;
          model.position.set(
            posA.x,
            posA.y,
            posA.z
          );
          model.traverse((o) => {
            o.receiveShadow = true;
            o.castShadow = true;
          });

          models.push(model);
          scene.add(model);
          model['box'] = new THREE.Box3().setFromObject(model);

          let mixNum = mixer.push(mix) - 1;
          let arrow = 'assets/models/arrow.glb';
          let scale = { x: 0.04, y: 0.04, z: 0.04 };
          let troop = scene.getObjectByProperty('uuid', uuid);

          new initDefence().start(
            arrow,
            { x: 35.706902343649205, y: 7.789876054482494, z: 50.77271130785397 },
            scale,
            null,
            'arrow1',
            uuid,
            model.animations,
            mixNum,
            this.healthbars,
            scene,
            models,
            mixer,
            troop
          );

          new initDefence().start(
            arrow,
            { x: -20.923471399812428, y: 7.299536273584997, z: 52.518718754977456, },
            scale,
            null,
            'arrow2',
            uuid,
            model.animations,
            mixNum,
            this.healthbars,
            scene,
            models,
            mixer,
            troop
          );
          runAction.play();

          new moveNpc().start(runAction, attackAction, posA, model, scene, navmesh);
          if (i === loops - 1) {
            this.service.setIsUnderAttacking(false);
          }
        })
      }, 1500 * i);
    }
  }
}
