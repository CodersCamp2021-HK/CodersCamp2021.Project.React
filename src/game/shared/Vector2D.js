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
    return new Vector2D(this.x, y);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  static get Zero() {
    return new Vector2D(0, 0);
  }

  /**
   * @param {Vector2D} v
   */
  equals(v) {
    return this.x === v.x && this.y === v.y;
  }

  /**
   * @param {Vector2D} v
   */
  add(v) {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }
}

export { Vector2D };
