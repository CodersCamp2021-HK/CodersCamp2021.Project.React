import { GRAVITY_VECTOR } from '../../config';
import { Vector } from '../../shared';

class Rigidbody {
  #velocityVector = Vector.Zero;

  #accelerationVector = Vector.Zero;

  addGravity() {
    this.addAcceleration(GRAVITY_VECTOR);
  }

  get velocity() {
    return this.#velocityVector;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  set velocity(v) {
    this.#velocityVector = v;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  addVelocity(v) {
    this.#velocityVector = this.#velocityVector.add(v);
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  addAcceleration(v) {
    this.#accelerationVector = this.#accelerationVector.add(v);
  }

  /**
   * @param {import('./Transform').Transform} transform
   */
  update(transform) {
    this.#velocityVector = this.#velocityVector.add(this.#accelerationVector);
    // eslint-disable-next-line no-param-reassign
    transform.origin = transform.origin.add(this.#velocityVector);
  }
}

export { Rigidbody };
