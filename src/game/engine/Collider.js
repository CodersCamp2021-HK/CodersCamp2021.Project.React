/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

class Collider {
  #gameObject;

  /**
   * @param {import('./GameObject').GameObject} gameObject
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

  /**
   * @param {Collider} collider
   */
  hasCollisionWith(collider) {
    throw new Error('Abstract method');
  }
}

export { Collider };
