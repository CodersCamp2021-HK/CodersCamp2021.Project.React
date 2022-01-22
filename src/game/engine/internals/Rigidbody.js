import { Vector } from '../../shared';

const GRAVITY_ACCELERATION = 0.001;

class Rigidbody {
  #resultVector = Vector.Zero;

  #velocityVector = Vector.Zero;

  #accelerationVector = Vector.Zero;

  addGravity() {
    this.addAcceleration(new Vector(0, GRAVITY_ACCELERATION));
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  addVelocity(v) {
    this.#velocityVector = v;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  addAcceleration(v) {
    this.#accelerationVector = this.#accelerationVector.add(v);
    this.#resultVector = this.#resultVector.add(this.#accelerationVector);
  }

  #findResultVector() {
    this.#velocityVector = this.#velocityVector.add(this.#accelerationVector);
    this.#resultVector = this.#resultVector.add(this.#velocityVector);
  }

  /**
   * @param {import('./Transform').Transform} transform
   */
  update(transform) {
    this.#findResultVector();
    transform.updatePosition(this.#resultVector);
    transform.updateOrigin();
  }
}

export { Rigidbody };
