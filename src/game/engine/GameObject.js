/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * @template {Record<string, any>} T
 * @template {GameObject<T>} R
 * @typedef {new (proxy: import('./internals/GameObjectImpl').GameObjectProxy<T>) => R} GameObjectConstructor
 */

/**
 * @template {Record<string, any>} [T={}]
 */
class GameObject {
  // #region interface

  /**
   * @abstract
   * @param {T} args
   */
  onActivate(args) {}

  /**
   * @abstract
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {}

  /**
   * @abstract
   */
  onDestroy() {}

  /**
   * @abstract
   * @param {import('../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {}

  // #endregion

  // #region implementation

  #proxy;

  /**
   * @param {import('./internals/GameObjectImpl').GameObjectProxy<T>} proxy
   */
  constructor(proxy) {
    if (this.constructor === GameObject) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.#proxy = proxy;
  }

  get id() {
    return this.#proxy.id;
  }

  /**
   * @template {Record<string, any>} A
   * @template {import('./GameObject').GameObject<A>} R
   * @param {import('./GameObject').GameObjectConstructor<A, R>} Cls
   * @param {{ name?: string, args?: A }} params
   * @returns {R}
   */
  create(Cls, params = {}) {
    return this.#proxy.createGameObject(Cls, params);
  }

  /**
   * @param {import("./GameObject").GameObject} obj
   */
  destroy(obj) {
    return this.#proxy.destroyGameObject(obj);
  }

  /**
   * @template {unknown[]} R
   * @template {import('./internals/Collider').ColliderConstructor<R>} C
   * @param {C} Cls
   * @param {R} args
   */
  setCollider(Cls, args) {
    this.#proxy.setCollider(Cls, args);
  }

  get collider() {
    return this.#proxy.collider;
  }

  get ui() {
    return this.#proxy.ui;
  }

  get keyboard() {
    return this.#proxy.keyboard;
  }

  get position() {
    return this.#proxy.position;
  }

  set position(val) {
    this.#proxy.setPosition(val);
  }

  // #endregion
}

export { GameObject };
