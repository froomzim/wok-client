export class Component {
  parent = null;

  constructor() {
  }

  public setParent(p) {
    this.parent = p;
  }

  public initComponent() { }

  public getComponent(n) {
    return this.parent.GetComponent(n);
  }

  public findEntity(n) {
    return this.parent.FindEntity(n);
  }

  public broadcast(m) {
    this.parent.Broadcast(m);
  }

  public update(_) { }

  public registerHandler(n, h) {
    this.parent.registerHandler(n, h);
  }
};
