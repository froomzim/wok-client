import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Component } from './component.js';


export const static_model_component = (() => {

  class StaticModelComponent extends Component.Component {
    params: any;
    target: any;

    constructor(params) {
      super();
      this.Init(params);
    }

    public Init(params) {
      this.params = params;

      this.LoadModels();
    }

    public InitComponent() {
      this.RegisterHandler('update.position', (m) => { this.OnPosition(m); });
    }

    public OnPosition(m) {
      if (this.target) {
        this.target.position.copy(m.value);
      }
    }

    public LoadModels() {
      if (this.params.resourceName.endsWith('glb') || this.params.resourceName.endsWith('gltf')) {
        this.LoadGLB();
      } else if (this.params.resourceName.endsWith('fbx')) {
        this.LoadFBX();
      }
    }

    public OnLoaded(obj) {
      this.target = obj;
      this.params.scene.add(this.target);

      this.target.scale.setScalar(this.params.scale);
      this.target.position.copy(this.parent._position);

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
    }

    public LoadGLB() {
      const loader = new GLTFLoader();
      loader.setPath(this.params.resourcePath);
      loader.load(this.params.resourceName, (glb) => {
        this.OnLoaded(glb.scene);
      });
    }

    public LoadFBX() {
      const loader = new FBXLoader();
      loader.setPath(this.params.resourcePath);
      loader.load(this.params.resourceName, (fbx) => {
        this.OnLoaded(fbx);
      });
    }

    public Update(timeInSeconds) {
    }
  };

  return {
    StaticModelComponent: StaticModelComponent,
  };

})();
