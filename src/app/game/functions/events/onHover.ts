
import * as THREE from 'three';
import { randInt } from "three/src/math/MathUtils";

export class onHover {
  constructor(mouse: THREE.Vector2, raycaster: THREE.Raycaster, camera: THREE.Camera, scene: THREE.Scene, waypointsNames: string[], hover: boolean) {
    this.onHover(mouse, raycaster, camera, scene, waypointsNames, hover);
  }
  onHover(mouse: THREE.Vector2, raycaster: THREE.Raycaster, camera: THREE.Camera, scene: THREE.Scene, waypointsNames: string[], hover: boolean) {


    const onHover = (event) => {
      // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // raycaster.setFromCamera(mouse, camera);


      // const intersects = raycaster.intersectObjects(scene.children, true);
      // if (intersects.length > 0) {
      //   if (waypointsNames.includes(intersects[0].object.name) && hover == false) {
      //     hover = true;
      //     intersects[0].object.traverse((child) => {
      //       if (child instanceof THREE.Mesh) {
      //         child.material.color.set(randInt(0, 0xffffff));
      //       }
      //     });
      //     { document.body.style.cursor = 'pointer' }
      //   } else {
      //     hover = false;
      //     { document.body.style.cursor = 'default' }
      //   }
      // }
    };


    window.addEventListener('mousemove', onHover, false);

  }
}
