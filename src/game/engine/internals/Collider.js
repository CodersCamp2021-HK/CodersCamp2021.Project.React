/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * @template {unknown[]} T
 * @typedef {new (gameObject: import('../GameObject').GameObject, ...rest: T) => import('./Collider').Collider} ColliderConstructor
 */

class Collider {
  // #region interface

  /**
   * @abstract
   * @param {Collider} collider
   */
  hasCollisionWith(collider) {
    throw new Error('Abstract method');
  }

  // #endregion

  // #region implementation
  #gameObject;

  /**
   * @param {import('../GameObject').GameObject} gameObject
   */
  constructor(gameObject) {
    if (this.constructor === Collider) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.#gameObject = gameObject;
  }

  get gameObject() {
    return this.#gameObject;
  }
  // #endregion

  // #region debug

  /**
   * @param {import('./CanvasBuffer').CanvasBuffer} buffer
   */
  DEBUG_Draw(buffer) {}

  // #endregion
}

export { Collider };
