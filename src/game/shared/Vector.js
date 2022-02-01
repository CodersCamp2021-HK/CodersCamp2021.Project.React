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

  /**
   * @param {Vector} v
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  normalized() {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2);
    return length === 0 ? Vector.Zero : new Vector(this.x / length, this.y / length);
  }

  /**
   * @param {Vector} v
   */
  distanceSquaredTo(v) {
    return (this.x - v.x) ** 2 + (this.y - v.y) ** 2;
  }
}

export { Vector };
