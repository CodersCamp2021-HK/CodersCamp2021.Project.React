/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
class Display {
  constructor() {
    if (this.constructor === Display) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  flush(/** @type {import('./DisplayBuffer').DisplayBuffer} */ buffer) {
    throw new Error('Abstract method');
  }
}

export { Display };
