class Vector2D {
  #x;

  #y;

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  /**
   * @param {number} x
   */
  setX(x) {
    return new Vector2D(x, this.y);
  }

  /**
   * @param {number} y
   */
  setY(y) {
    return new Vector2D(y, this.y);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }
}

export { Vector2D };
