import { GameService } from 'src/app/services/game/game.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { UserProfile } from '../model/user-profile.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import gsap from 'gsap';
import GameFrameEmitter from 'src/app/services/GameFrameEmitter';
import { civilization } from '../model/civilizations/vikings/Vikings_03';
import { Water } from 'three/examples/jsm/objects/Water';

// game functions
import { initWater } from '../functions/init/initWater';
import { InitSky } from '../functions/init/initSky';
import { InitControls } from '../functions/init/initControls';
import { onHover } from '../functions/events/onHover';
import { Attack } from '../functions/events/attack';
import { initLights } from '../functions/init/initLights';
import { initNpcs } from '../functions/init/initNpcs';
import { EntityManager } from './entity/entity-manager';

export class StartGame {
  private camera: THREE.PerspectiveCamera = {} as THREE.PerspectiveCamera;
  private controls: OrbitControls = {} as OrbitControls;
  private clock: THREE.Clock = new THREE.Clock();
  private mixer: THREE.AnimationMixer[] = [] as THREE.AnimationMixer[];
  private water: Water;
  private navmesh: THREE.Mesh = {} as THREE.Mesh;
  public loaded: boolean = false;
  public userProfile: Observable<UserProfile>;
  public scene: THREE.Scene = new THREE.Scene();
  public models: Array<THREE.Group> = [];
  public healthbars: Array<number> = [];
  public isLoaded: BehaviorSubject<boolean>;
  public isFocused: BehaviorSubject<boolean>;
  public focusedAt: BehaviorSubject<string>;
  waypoints: any = [];
  waypointsNames: any = ['blacksmith', 'storage', 'entrance', 'castle', 'training', 'default'];
  hover: boolean = false;
  public listener: THREE.AudioListener;
  public sound: THREE.Audio;
  public xhr: string;
  public entity_manager = new EntityManager();

  constructor(
    private readonly api: ApiService,
    private readonly service: GameService
  ) {
    this.isLoaded = this.service.getIsLoaded();
    this.isFocused = this.service.getIsFocused();
    this.focusedAt = this.service.getFocusedAt();

    this.service.gameCallback.subscribe((data) => {
      if (!this[data.functionName]) return;
      this[data.functionName](...data.argument);
    });

    this.startGame();
  }

  startGame() {
    if (this.service.getIsLoaded().value) return;

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    this.camera.matrixAutoUpdate = true;
    this.camera.position.set(
      -187.70815433099722,
      40.62889963281103,
      -147.1018718283057
    );

    let canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);

    new initLights(this.scene);
    new InitSky(this.scene, renderer, this.camera);
    this.controls = new InitControls(this.camera, renderer).controls;
    this.getUserProfile();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
    this.camera.add(this.listener);
    new onHover(mouse, raycaster, this.camera, this.scene, this.waypointsNames, this.hover);

    const onClick = (evt: any) => {
      var canvas = renderer.domElement;
      var canvasPosition = canvas.getBoundingClientRect();

      mouse.x = ((evt.clientX - canvasPosition.left) / canvas.width) * 2 - 1;
      mouse.y = -((evt.clientY - canvasPosition.top) / canvas.height) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        console.log(
          'name:' + intersects[0].object.name,
          ' id:' + intersects[0].object.id,
          ' uuid:' + intersects[0].object.uuid,
          ' type:' + intersects[0].object.type,
          ' children:' + intersects[0].object.children,
          ' pos: x:' + intersects[0].point.x + ' y:' + intersects[0].point.y + ' z:' + intersects[0].point.z
        );
        this.meshEvents(intersects[0].object.name);
      }
    };

    window.addEventListener('click', onClick, false);
    this.loadWaypoints();

    const animate = () => {
      const delta = this.clock.getDelta();
      requestAnimationFrame(animate.bind(this));
      this.controls.update();
      this.render(renderer);

      if (this.water !== undefined) {
        this.water.material.uniforms.time.value += 1.0 / 60.0;
      }
      if (this.mixer) {
        this.mixer.forEach((mixer) => {
          mixer.update(delta);
        });
      }
    };
    animate();
  }

  meshEvents(name: string) {
    if (name == 'default') {
      this.service.setIsFocused(false);
      this.service.setFocusedAt('default');
      this.stopSound();
      this.showWaypoints();
      this.warp(civilization.civilization_level.waypoints['default'].position, civilization.civilization_level.waypoints['default'].lookAt, 'default');
      this.models.forEach((model) => {
        this.scene.remove(model);
      });
      return;
    }

    if (this.isFocused.value) return;
    if (!this.waypointsNames.includes(name)) return;
    this.service.setIsFocused(true);
    this.hiddenWaypoints();
    new initNpcs().loadNpc(name, this.scene, this.models, this.mixer, this.entity_manager);
    switch (name) {
      case 'castle':
        this.warp(civilization.civilization_level.waypoints['castle'].position, civilization.civilization_level.waypoints['castle'].lookAt, 'castle');
        break;
      case 'blacksmith':
        this.warp(civilization.civilization_level.waypoints['blacksmith'].position, civilization.civilization_level.waypoints['blacksmith'].lookAt, 'blacksmith');
        break;
      case 'storage':
        this.warp(civilization.civilization_level.waypoints['storage'].position, civilization.civilization_level.waypoints['storage'].lookAt, 'storage');
        break;
      case 'training':
        this.warp(civilization.civilization_level.waypoints['training'].position, civilization.civilization_level.waypoints['training'].lookAt, 'training');
        break;
      case 'entrance':
        this.warp(civilization.civilization_level.waypoints['entrance'].position, civilization.civilization_level.waypoints['entrance'].lookAt, 'entrance');
        break;
    }
  }

  showWaypoints() {
    this.waypoints.forEach((waypoint) => {
      waypoint.visible = true;
    });
  }

  hiddenWaypoints() {
    this.waypoints.forEach((waypoint) => {
      waypoint.visible = false;
    });
  }

  loadWaypoints() {
    for (let waypoint in civilization.civilization_level.waypoints) {
      if (waypoint != 'default') {
        let cone = this.createCone();
        cone.position.set(
          civilization.civilization_level.waypoints[waypoint].waypoint.x,
          civilization.civilization_level.waypoints[waypoint].waypoint.y,
          civilization.civilization_level.waypoints[waypoint].waypoint.z
        );
        cone.name = waypoint;
        this.waypointsNames.push(waypoint);
        this.waypoints.push(cone);
        this.scene.add(cone);
      }
    }
  }

  warp(pos: any, lookAt: any, waypointName: string) {
    this.controls.target = new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z);
    gsap
      .to(this.controls.object.position, {
        duration: 2,
        x: pos.x,
        y: pos.y,
        z: pos.z,
        ease: 'power2.inOut',
      })
      .eventCallback('onComplete', () => {
        this.camera.position.set(pos.x, pos.y, pos.z);
        this.service.setFocusedAt(waypointName);
        this.playSound(waypointName);
      });
  }


  render(renderer: THREE.WebGLRenderer) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    GameFrameEmitter.next({});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(this.scene, this.camera);
  }

  getUserProfile() {
    let get = this.api.profile.getProfile();
    get.subscribe({
      next: (data: any) => {
        localStorage.setItem('civilization', data['data']['civilization']['name'].toLowerCase());
        this.loadModel(data['data']['civilization_level']['model_path']);
        if (data['data']['place'] == 'Lake') {
          this.water = new initWater(this.scene).water;
        }

        this.loadNavMesh();
      },
      complete: () => {
      }, error: (err) => {
        if (err.status == 401) {
          window.location.href = '/login';
        }
      }
    });
  }

  loadModel(path: string) {
    const gtfLoader = new GLTFLoader();
    gtfLoader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.traverse((o) => {
          o.receiveShadow = true;
          o.castShadow = true;
        });
        this.scene.add(model);
        this.service.setIsLoaded(true);
      },
      (xhr) => {
        this.xhr = 'Loading Civilization... ' + Math.trunc((xhr.loaded / xhr.total) * 100) + '%';
      }
    )
  }

  loadNavMesh() {
    const loader = new GLTFLoader();
    loader.load(
      'assets/models/civilizations/vikings/3/Vikings_Lake_LVL3_Nav.glb',
      ({ scene }) => {
        scene.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          if (child.name !== 'Navmesh') {
            child.visible = false;
            return
          };
          child.material.transparent = true;
          child.material.opacity = 0.0;
          child.position.set(0, 0, 0);
          this.navmesh = child;
        }), (xhr) => {
          this.xhr = 'Loading Navmesh... ' + Math.trunc((xhr.loaded / xhr.total) * 100) + '%';
        };

        this.scene.add(scene);
      },
      undefined,
      (e) => {
        console.error(e);
      }
    );
  }

  createCone() {
    let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    let mesh = new THREE.Mesh(new THREE.ConeGeometry(4, 4, 32), material);
    mesh.rotation.x = Math.PI;
    mesh.material.transparent = true;
    mesh.material.opacity = 0.8;
    mesh.material.depthWrite = false;
    mesh.frustumCulled = false;
    return mesh;
  }

  playSound(name: string) {
    const audioLoader = new THREE.AudioLoader();
    const sound = this.sound;
    switch (name) {
      case 'blacksmith':
        audioLoader.load('assets/sounds/blacksmith.ogg', function (buffer) {
          sound.setBuffer(buffer);
          sound.setLoop(true);
          sound.setVolume(0.5);
          sound.play();
        });
        break;
    }
  }

  stopSound() {
    if (this.sound.isPlaying) this.sound.stop();
  }


  attack() {
    new Attack().attack(this.models, this.scene, this.mixer, this.navmesh);
  }
}
