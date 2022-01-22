import { Vector } from '../../shared';

const GRAVITY_ACCELERATION = 0.02;
const GRAVITY_VECTOR = new Vector(0, GRAVITY_ACCELERATION);
class Rigidbody {
  #resultVector = Vector.Zero;

  #velocityVector = Vector.Zero;

  #accelerationVector = Vector.Zero;

  addGravity() {
    this.addAcceleration(GRAVITY_VECTOR);
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
   * @param {import('./Transform').Transform} t
   */
  update(t) {
    const transform = t;
    this.#velocityVector = this.#velocityVector.add(this.#accelerationVector);
    transform.origin = transform.origin.add(this.#velocityVector);
  }
}

export { Rigidbody };
