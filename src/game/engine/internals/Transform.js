import { Vector } from '../../shared';

class Transform {
  #position = Vector.Zero;

  #origin = Vector.Zero;

  #width = 0;

  #height = 0;

  get width() {
    return this.#width;
  }

  /**
   * @param {number} w
   */
  set width(w) {
    this.#width = w;
  }

  get height() {
    return this.#height;
  }

  /**
   * @param {number} h
   */
  set height(h) {
    this.#height = h;
  }

  get position() {
    return this.#position;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  set position(v) {
    this.#position = v;
  }

  get origin() {
    return this.#origin;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  set origin(v) {
    this.#origin = v;
    this.#updatePosition();
  }

  #updatePosition() {
    this.#position = new Vector(this.#origin.x - 0.5 * this.#width, this.#origin.y - 0.5 * this.#height);
  }
}

export { Transform };
