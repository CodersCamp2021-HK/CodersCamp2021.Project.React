class Vector {
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
    return new Vector(x, this.y);
  }

  /**
   * @param {number} y
   */
  setY(y) {
    return new Vector(this.x, y);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  static get Zero() {
    return new Vector(0, 0);
  }

  /**
   * @param {Vector} v
   */
  equals(v) {
    return this.x === v.x && this.y === v.y;
  }

  /**
   * @param {Vector} v
   */
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /**
   * @param {Vector} v
   */
  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * @param {number} s
   */
  scale(s) {
    return new Vector(this.x * s, this.y * s);
  }
}

export { Vector };
