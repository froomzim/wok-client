export class EntityManager {
  ids: number = 0;
  entitiesMap: object = {};
  entities: Array<any> = [];

  constructor() {
  }

  public generateName() {
    this.ids += 1;

    return '__name__' + this.ids;
  }

  public get(n) {
    return this.entitiesMap[n];
  }

  public filter(cb) {
    return this.entities.filter(cb);
  }

  public add(e, n?) {
    if (!n) {
      n = this.generateName();
    }

    this.entitiesMap[n] = e;
    this.entities.push(e);

    // e.SetParent(this);
    // e.SetName(n);
  }

  public setActive(e, b) {
    const i = this.entities.indexOf(e);
    if (i < 0) {
      return;
    }

    this.entities.splice(i, 1);
  }

  public update(timeElapsed) {
    for (let e of this.entities) {
      e.Update(timeElapsed);
    }
  }
}
