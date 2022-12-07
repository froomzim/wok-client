import { EntityManager } from './../entity/entity-manager';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Entity } from '../entity/entity';
import { AnimatedModelComponent } from '../entity/animated-model-component';

export class initNpcs {

  constructor() {
  }

  public loadNpc(name: string, scene: THREE.Scene, models: Array<THREE.Group>, mixer: THREE.AnimationMixer[], entity_manager: any) {
    switch (name) {
      case 'blacksmith':
        this.loadBlacksmith(scene, models, mixer, entity_manager);
        break;
      case 'storage':
        this.loadStorage(scene, models, mixer, entity_manager);
        break;
      case 'training':
        this.loadTrainers(scene, models, mixer, entity_manager);
        break;
    }
  }

  private loadTrainers(scene: THREE.Scene, models: Array<THREE.Group>, mixer: THREE.AnimationMixer[], entity_manager: EntityManager) {
    const trainer = new Entity();
    trainer.addComponent(
      new AnimatedModelComponent({
        scene: scene,
        resoucePath: 'assets/models/civilizations/' + localStorage.getItem('civilization') + '/npcs/soldiers/',
        resrouceName: 'scene.gltf',
        position: new THREE.Vector3(54.89857054754572, -2.3103384799428794, -121.23574701542987),
        scale: 0.85
      }));
      trainer.setPosition(new THREE.Vector3(54.89857054754572, -2.3103384799428794, -121.23574701542987));
      entity_manager.add(trainer);
      trainer.setActive(true);


    // let loader = new GLTFLoader();
    // loader.load('assets/models/civilizations/' + localStorage.getItem('civilization') + '/npcs/soldiers/scene.gltf', (gltf) => {
    //   gltf.scene.traverse((child) => {
    //     if (child instanceof THREE.Mesh) {
    //       child.castShadow = true;
    //       child.receiveShadow = true;
    //     }
    //   });

    //   let model = gltf.scene;
    //   model.position.set(54.89857054754572, -2.3103384799428794, -121.23574701542987);
    //   model.scale.set(0.85, 0.85, 0.85);
    //   model.name = 'trainer';
    //   model.rotateY(Math.PI / 2);
    //   scene.add(model);

    //   let mix = new THREE.AnimationMixer(gltf.scene);
    //   let animations = gltf.animations;
    //   let attack = mix.clipAction(
    //     animations.find((a) => a.name === 'Armature|ATTAK-02')
    //   );
    //   mixer.push(mix);
    //   attack.setEffectiveTimeScale(1.2);
    //   models.push(model);
    //   attack.play();

    // });

    // loader.load('assets/models/civilizations/' + localStorage.getItem('civilization') + '/npcs/soldiers/scene.gltf', (gltf) => {
    //   gltf.scene.traverse((child) => {
    //     if (child instanceof THREE.Mesh) {
    //       child.castShadow = true;
    //       child.receiveShadow = true;
    //     }
    //   });

    //   let model = gltf.scene;
    //   model.position.set(58, -2.3103384799428794, -116.23574701542987);
    //   model.scale.set(0.85, 0.85, 0.85);
    //   model.name = 'trainer';
    //   model.rotateY(Math.PI / 2);
    //   scene.add(model);

    //   let mix = new THREE.AnimationMixer(gltf.scene);
    //   let animations = gltf.animations;
    //   let attack = mix.clipAction(
    //     animations.find((a) => a.name === 'Armature|ATTAK-04')
    //   );

    //   mixer.push(mix);
    //   models.push(model);
    //   attack.setEffectiveTimeScale(0.8);
    //   attack.play();
    // });
  }

  private loadStorage(scene: THREE.Scene, models: Array<THREE.Group>, mixer: THREE.AnimationMixer[], entity_manager: any) {
    console.log('token', localStorage.getItem('authToken'));
    let glbLoader = new GLTFLoader();
    glbLoader.load('assets/models/civilizations/' + localStorage.getItem('civilization') + '/npcs/test/idle.glb', (glb) => {
      let model = glb.scene;
      model.scale.set(0.013, 0.013, 0.013);
      model.position.set(-100.75607255078503, 0.5970775193385771, -130.1543477605814);
      let animations = glb.animations;
      let mix = new THREE.AnimationMixer(model);
      let idle = mix.clipAction(animations.find((a) => a.name === 'Action.006'));

      mixer.push(mix);
      models.push(model);
      idle.play();
      scene.add(model);

    });
  }


  private loadBlacksmith(scene: THREE.Scene, models: Array<THREE.Group>, mixer: THREE.AnimationMixer[], entity_manager: any) {
    let fbxLoader = new FBXLoader();
    fbxLoader.load('assets/models/civilizations/' + localStorage.getItem('civilization') + '/npcs/blacksmith/blacksmith_npc.fbx', (fbx) => {
      const model = fbx;
      model.scale.set(0.014, 0.014, 0.014);
      model.position.set(-58.1307036753052, -2.35, -16.59849759627534);
      model.rotateY(Math.PI / 2);
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      let fbxLoader = new FBXLoader();
      fbxLoader.load('assets/models/civilizations/animations/warrior_idle.fbx', (fbx) => {
        let mix = new THREE.AnimationMixer(model);
        let idleAction = mix.clipAction(fbx.animations[0]);
        mixer.push(mix);
        idleAction.play();
      });
      models.push(model);
      scene.add(model);
    });

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(-64.1307036753052, 20.5, -9.59849759627534);
    light.color.setHSL(0.1, 1, 0.95);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);


  }
}
