/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class DisplayBuffer {
  constructor() {
    if (this.constructor === DisplayBuffer) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /** @returns {number} */
  get width() {
    throw new Error('Abstract method');
  }

  /** @returns {number} */
  get height() {
    throw new Error('Abstract method');
  }

  clear() {
    throw new Error('Abstract method');
  }

  draw(/** @type {import('../shared').Vector2D} */ position, /** @type {import('../shared').Sprite} */ sprite) {
    throw new Error('Abstract method');
  }
}

export { DisplayBuffer };
