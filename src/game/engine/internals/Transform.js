import { Vector } from '../../shared';

const GRAVITY_ACCELERATION = 0.001;

class Transform {
  position = Vector.Zero;

  width;

  height;

  gravityInit = 0;

  gravity() {
    if (this.vector === undefined) this.vector = this.position;
    this.gravityInit += GRAVITY_ACCELERATION;
    this.vector = this.vector.setY(this.vector.y + this.gravityInit);
  }

  /**
   * @param { import('../../shared').Vector } v
   */
  velocity(v) {
    if (this.vector === undefined) this.vector = this.position;
    this.vector = this.vector.setX(this.vector.x + v.x);
    this.vector = this.vector.setY(this.vector.y + v.y);
  }

  /**
   * @param { import('../../shared').Vector } v
   */
  acceleration(v) {
    if (this.vector === undefined) this.vector = this.position;
    if (this.speedX === undefined || this.speedY === undefined) {
      this.speedX = v.x;
      this.speedY = v.y;
    } else {
      this.speedX += v.x;
      this.speedY += v.y;
    }
    this.vector = this.vector.setX(this.vector.x + this.speedX);
    this.vector = this.vector.setY(this.vector.y + this.speedY);
  }

  setPosition() {
    this.position = this.vector ?? this.position;
  }
}

export { Transform };
