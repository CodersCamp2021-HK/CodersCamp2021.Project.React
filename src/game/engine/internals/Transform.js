import { Vector } from '../../shared';

class Transform {
  position = Vector.Zero;

  origin = Vector.Zero;

  width;

  height;

  /**
   * @param {import('../shared/Vector').Vector} v
   */
  setPosition(v) {
    this.position = this.position.add(v);
  }

  setOrigin() {
    this.origin = new Vector(this.position.x + 0.5 * this.width, this.position.y + 0.5 * this.height);
  }
}

export { Transform };
