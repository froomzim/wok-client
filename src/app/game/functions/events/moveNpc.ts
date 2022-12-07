import GameFrameEmitter from "src/app/services/GameFrameEmitter";
import { Vector3 } from "three";
import { randInt } from "three/src/math/MathUtils";
import * as THREE from 'three';
import { Pathfinding } from 'three-pathfinding';

export class moveNpc {
  constructor() {
    this.start = this.start.bind(this);
  }

  start(runAction, attackAction, posA, model, scene, navmesh) {
    runAction.enabled = true;
    runAction.setEffectiveTimeScale(1.2);
    let endPos = [
      new Vector3(24.41, -1.39, 38.76),
      new Vector3(61.8, -1.43, -15.95),
      new Vector3(12.07, -1.43, 20.48),
      new Vector3(-68.3, -1.43, -17.29),
      new Vector3(-68.43, -1.43, -55.87),
      new Vector3(-44.62, -1.35, -107.63),
      new Vector3(-2.4, -1.43, -97.73),
      new Vector3(44.69, -1.43, -95.03),
      new Vector3(74.46, -1.43, -77.33),
      new Vector3(-1.58, -1.43, -100.39),
      new Vector3(13.46, -1.43, -29.92),
      new Vector3(65.77, -1.43, -15.62),
      new Vector3(5.42, -1.43, -36.63),
      new Vector3(34.49, -1.43, -72.44),
      new Vector3(-27.15, -1.43, 1.42),
      new Vector3(-22.89, -1.43, -25.5),
      new Vector3(46.19, -1.43, -29.92),
      new Vector3(-35.51, -1.43, 21.34),
      new Vector3(-53.37, -1.43, -7.43),
      new Vector3(-31.29, -1.35, -100.42),
      new Vector3(43.73, -1.43, 24.41),
      new Vector3(-58.89, -1.43, -55.29),
      new Vector3(-69.99, -1.61, -80.43),
      new Vector3(37.64, -1.43, 18.21),
      new Vector3(-13.55, -1.43, 25.35),
      new Vector3(30.99, -1.43, 6.22),
      new Vector3(42.54, -1.43, -19.15),
    ];

    let wall = scene.getObjectByName('SM_Bld_Base_01031');
    let target = new THREE.Mesh(
      new THREE.BoxGeometry(5, 10, 5),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    target.position.set(wall.position.x, wall.position.y, wall.position.z);
    let box = new THREE.Box3().setFromObject(target);


    let weapon = model.children[0]['children'][0]['children'][0]['children'][0]['children'][0]['children'][3];
    weapon.material.color.setHex(randInt(0, 0xffffff));

    const pathfinding = new Pathfinding();
    const ZONE = 3;
    pathfinding.setZoneData(ZONE, Pathfinding.createZone(navmesh.geometry));
    const groupId = pathfinding.getGroup(ZONE, posA);
    const steps = pathfinding.findPath(
      posA,
      endPos[randInt(0, endPos.length - 1)],
      ZONE,
      groupId,
    );
    model.position.add(posA);
    const move = () => {
      if (steps.length === 0) return;
      const pos = new THREE.Vector3(steps[0].x, steps[0].y, steps[0].z);
      model.lookAt(steps[0].x, steps[0].y, steps[0].z);
      let foward = new THREE.Vector3(0, 0, 1);
      foward.applyQuaternion(model.quaternion);
      model.position.add(foward.multiplyScalar(0.18));
      if (model.position.distanceTo(pos.clone()) < 0.4) {
        steps.shift();
        if (steps.length === 0) {
          runAction.fadeOut(0.5);
          attackAction.fadeIn(0.5);
          attackAction.enabled = true;
          return;
        }
      }
    }

    GameFrameEmitter.subscribe(() => {
      move();
    });
  }
}
