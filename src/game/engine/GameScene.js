/* eslint-disable class-methods-use-this */
/** @typedef {'CREATED' | 'ACTIVE' | 'DESTROYED'} GameObjectStatus */

class GameScene {
  /** @type {import('./GameObject').GameObject[]} */
  #gameObjects = [];

  /** @type {Set<import('./GameObject').GameObject>} */
  #markedToDestroy = new Set();

  /** @type {import('./GameObject').GameObject[]} */
  #markedToActivate = [];

  #currentID = 0;

  constructor() {
    if (this.constructor === GameScene) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  activate() {
    throw new Error('Abstract method');
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    try {
      this.#gameObjects.forEach((gameObject) => {
        gameObject.update(frame);
      });
    } finally {
      this.#updateActive();
      this.#updateDestroy();
    }
  }

  destroy() {
    this.#currentID = 0;
    this.#gameObjects = [];
    this.#markedToActivate = [];
    this.#markedToDestroy.clear();
  }

  /**
   * @template {Record<string, any>} T
   * @template {import('./GameObject').GameObjectConstructor<T>} C
   * @param {C} cls
   * @param {{ name?: string, args?: T }} params
   * @returns {import('./GameObject').GameObject<T>}
   */
  createGameObject(cls, params = {}) {
    const args = /** @type {T} */ (params.args ?? {});
    // eslint-disable-next-line new-cap
    const obj = new cls({
      metadata: { id: this.#nextID(), name: params.name },
      scene: this,
      args,
    });
    this.#markedToActivate.push(obj);
    return obj;
  }

  /**
   * @param {import('./GameObject').GameObject} obj
   */
  destroyGameObject(obj) {
    if (!this.contains(obj)) {
      throw new Error(`Scene does not contains this GameObject ${obj}`);
    }
    this.#markedToDestroy.add(obj);
  }

  /**
   * @param {import('./GameObject').GameObject} gameObject
   * @returns {[true, GameObjectStatus] | [false]}
   */
  contains(gameObject) {
    if (this.#markedToActivate.includes(gameObject)) {
      return [true, 'CREATED'];
    }
    if (this.#markedToDestroy.has(gameObject)) {
      return [true, 'DESTROYED'];
    }
    if (this.#gameObjects.includes(gameObject)) {
      return [true, 'ACTIVE'];
    }
    return [false];
  }

  #updateActive() {
    this.#gameObjects.push(...this.#markedToActivate);
    this.#markedToActivate = [];
  }

  #updateDestroy() {
    this.#gameObjects = this.#gameObjects.filter((x) => !this.#markedToDestroy.has(x));
    this.#markedToDestroy.clear();
  }

  #nextID() {
    return this.#currentID++;
  }
}

export { GameScene };
