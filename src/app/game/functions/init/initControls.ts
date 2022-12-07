import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export class InitControls {
  public controls: OrbitControls;

  constructor(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.initControls(camera, renderer);
  }

  initControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    // this.controls.enableZoom = false;
    // this.controls.enableRotate = false;
    // this.controls.enablePan = false;
    this.controls.target.set(
      -16.762417474659415,
      8.226521923682764,
      -51.15804019223767
    );
  }
}
