/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class UI {
  constructor() {
    if (this.constructor === UI) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * @param {number} distance
   */
  setDistance(distance) {
    throw new Error('Abstract method');
  }
}

export { UI };
