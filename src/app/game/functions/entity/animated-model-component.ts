import { Component } from './component';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';


export class AnimatedModelComponent extends Component {
  params: any;
  target: any;
  private mixer: THREE.AnimationMixer;

  constructor(params) {
    console.log('AnimatedModelComponent', params);
    super();
    this.init(params);
  }


  public init(params) {
    console.log('AnimatedModelComponent', params);
    // this.params = params;

    // this.loadModels();
  }

  public initComponent() {
    this.registerHandler('update.position', (m) => { this.onPosition(m); });
  }

  public onPosition(m) {
    if (this.target) {
      this.target.position.copy(m.value);
      this.target.position.y = 0.35;
    }
  }

  public loadModels() {
    if (this.params.resourceName.endsWith('glb') || this.params.resourceName.endsWith('gltf')) {
      this.loadGLB();
    } else if (this.params.resourceName.endsWith('fbx')) {
      this.loadFBX();
    }
  }

  public onLoaded(obj, animations?) {
    if (!animations) {
      animations = obj.animations;
    }

    this.target = obj;
    this.params.scene.add(this.target);

    this.target.scale.setScalar(this.params.scale);
    this.target.position.copy(this.parent._position);

    this.broadcast({
      topic: 'update.position',
      value: this.parent._position,
    });

    let texture = null;
    if (this.params.resourceTexture) {
      const texLoader = new THREE.TextureLoader();
      texture = texLoader.load(this.params.resourceTexture);
      texture.encoding = THREE.sRGBEncoding;
    }

    this.target.traverse(c => {
      let materials = c.material;
      if (!(c.material instanceof Array)) {
        materials = [c.material];
      }

      for (let m of materials) {
        if (m) {
          if (texture) {
            m.map = texture;
          }
          if (this.params.specular) {
            m.specular = this.params.specular;
          }
          if (this.params.emissive) {
            m.emissive = this.params.emissive;
          }
        }
      }
      if (this.params.receiveShadow != undefined) {
        c.receiveShadow = this.params.receiveShadow;
      }
      if (this.params.castShadow != undefined) {
        c.castShadow = this.params.castShadow;
      }
      if (this.params.visible != undefined) {
        c.visible = this.params.visible;
      }
    });

    const _OnLoad = (anim) => {
      const clip = anim.animations[0];
      const action = this.mixer.clipAction(clip);

      action.play();
    };

    const loader = new FBXLoader();
    loader.setPath(this.params.resourcePath);
    loader.load(this.params.resourceAnimation, (a) => { _OnLoad(a); });

    this.mixer = new THREE.AnimationMixer(this.target);

    this.parent._mesh = this.target;
    this.broadcast({
      topic: 'load.character',
      model: this.target,
    });
  }

  public loadGLB() {
    const loader = new GLTFLoader();
    loader.setPath(this.params.resourcePath);
    loader.load(this.params.resourceName, (glb) => {
      this.onLoaded(glb.scene, glb.animations);
    });
  }

  public loadFBX() {
    const loader = new FBXLoader();
    loader.setPath(this.params.resourcePath);
    loader.load(this.params.resourceName, (fbx) => {
      this.onLoaded(fbx);
    });
  }

  public update(timeInSeconds) {
    if (this.mixer) {
      this.mixer.update(timeInSeconds);
    }
  }
};

