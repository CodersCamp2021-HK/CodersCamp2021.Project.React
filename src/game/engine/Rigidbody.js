import { Vector2D } from '../shared';
import { Transform } from './Transform';

class Rigidbody {
  addGravity() {
    this.gravity = true;
  }

  /**
   * @param {Vector2D} v
   */
  addVelocity(v) {
    this.velocity = true;
    this.velocityVector = v;
  }

  /**
   * @param {Vector2D} v
   */
  addAcceleration(v) {
    this.acceleration = true;
    this.accelerationVector = v;
  }

  /**
   * @param { Transform } transform
   */
  update(transform) {
    if (this.gravity) transform.gravity();
    // @ts-ignore
    if (this.velocity) transform.velocity(this.velocityVector);
    // @ts-ignore
    if (this.acceleration) transform.acceleration(this.accelerationVector);
    transform.setPosition();
  }
}

export { Rigidbody };
