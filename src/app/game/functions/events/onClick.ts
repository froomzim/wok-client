import { GameService } from "src/app/services/game/game.service";

export class onClick {

  private service: GameService
  constructor(mouse: THREE.Vector2, raycaster: THREE.Raycaster, camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
    this.onClick(mouse, raycaster, camera, scene, renderer);

  }
  onClick(mouse: THREE.Vector2, raycaster: THREE.Raycaster, camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
    const onClick = (evt: any) => {
      var canvas = renderer.domElement;
      var canvasPosition = canvas.getBoundingClientRect();

      mouse.x = ((evt.clientX - canvasPosition.left) / canvas.width) * 2 - 1;
      mouse.y = -((evt.clientY - canvasPosition.top) / canvas.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        console.log(
          'name:' + intersects[0].object.name,
          ' id:' + intersects[0].object.id,
          ' uuid:' + intersects[0].object.uuid,
          ' type:' + intersects[0].object.type,
          ' children:' + intersects[0].object.children,
          ' pos: x:' + intersects[0].point.x + ' y:' + intersects[0].point.y + ' z:' + intersects[0].point.z
        );
        console.log(intersects[0].object.name);
        this.service.meshEvents(intersects[0].object.name);
      }
    };
    window.addEventListener('click', onClick, false);
  }

}
