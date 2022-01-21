import { Vector } from '../../shared';

const GRAVITY_ACCELERATION = 0.001;

class Rigidbody {
  resultVector = Vector.Zero;

  gravityVector = Vector.Zero;

  velocityVector = Vector.Zero;

  accelerationVector = Vector.Zero;

  gravityInit = 0;

  velocityX = 0;

  velocityY = 0;

  addGravity() {
    this.gravityVector = new Vector(0, GRAVITY_ACCELERATION);
    this.resultVector = this.gravityVector;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  addVelocity(v) {
    this.velocityVector = v;
    this.velocityX = this.velocityVector.x;
    this.velocityY = this.velocityVector.y;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  addAcceleration(v) {
    this.accelerationVector = v;
    this.resultVector = this.resultVector.add(this.accelerationVector);
  }

  findResultVector() {
    this.gravityInit += this.gravityVector.y;
    this.velocityX += this.accelerationVector.x;
    this.velocityY += this.accelerationVector.y;

    this.resultVector = this.resultVector.setX(this.resultVector.x + this.velocityX);
    this.resultVector = this.resultVector.setY(this.resultVector.y + this.gravityInit + this.velocityY);
  }

  /**
   * @param {import('./Transform').Transform} transform
   */
  update(transform) {
    this.findResultVector();
    transform.setPosition(this.resultVector);
    transform.setOrigin();
  }
}

export { Rigidbody };
