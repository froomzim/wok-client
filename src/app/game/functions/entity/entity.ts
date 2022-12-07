import * as THREE from 'three';

export class Entity {
  public name: string;
  public components: any;
  public position: THREE.Vector3;
  rotation: THREE.Quaternion;
  handlers = {};
  parent = null;

  constructor() {
    this.name = null;
    this.components = {};

    this.position = new THREE.Vector3();
    this.rotation = new THREE.Quaternion();
    this.handlers = {};
    this.parent = null;
  }

  registerHandler(n, h) {
    if (!(n in this.handlers)) {
      this.handlers[n] = [];
    }
    this.handlers[n].push(h);
  }

  setParent(p) {
    this.parent = p;
  }

  setName(n) {
    this.name = n;
  }

  get Name() {
    return this.name;
  }

  setActive(b) {
    console.log('setActive', b);
    // this.parent.SetActive(this, b);
  }

  addComponent(c) {
    console.log('addComponent', c);
    // c.SetParent(this);
    // this.components[c.constructor.name] = c;

    // c.InitComponent();
  }

  getComponent(n) {
    return this.components[n];
  }

  findEntity(n) {
    return this.parent.Get(n);
  }

  broadcast(msg) {
    if (!(msg.topic in this.handlers)) {
      return;
    }

    for (let curHandler of this.handlers[msg.topic]) {
      curHandler(msg);
    }
  }

  setPosition(p) {
    this.position.copy(p);
    this.broadcast({
      topic: 'update.position',
      value: this.position,
    });
  }

  setQuaternion(r) {
    this.rotation.copy(r);
    this.broadcast({
      topic: 'update.rotation',
      value: this.rotation,
    });
  }

  update(timeElapsed) {
    for (let k in this.components) {
      this.components[k].Update(timeElapsed);
    }
  }
};
