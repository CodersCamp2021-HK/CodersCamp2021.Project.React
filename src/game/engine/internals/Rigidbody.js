import { Vector } from '../../shared';

const GRAVITY_ACCELERATION = 0.001;
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
   * @param {import('./Transform').Transform} transform
   */
  update(transform) {
    this.#velocityVector = this.#velocityVector.add(this.#accelerationVector);
    this.#resultVector = this.#resultVector.add(this.#velocityVector);
    // eslint-disable-next-line no-param-reassign
    transform.position = transform.position.add(this.#resultVector);
  }
}

export { Rigidbody };
