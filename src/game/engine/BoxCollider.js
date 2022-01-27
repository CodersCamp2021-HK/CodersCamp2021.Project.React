import { Collision, Shape, Vector } from '../shared';
import { Collider } from './internals/Collider';

class BoxCollider extends Collider {
  dimensions;

  offset;

  /**
   * @param {import('./GameObject').GameObject} gameObject
   * @param {import('../shared').Vector} dimensions
   * @param {import('../shared').Vector?} offset
   */
  constructor(gameObject, dimensions, offset) {
    super(gameObject);
    this.dimensions = dimensions;
    this.offset = offset ?? Vector.Zero;
  }

  /**
   * @returns {[import('../shared').Vector, import('../shared').Vector, import('../shared').Vector, import('../shared').Vector]}
   */
  get points() {
    const vx = new Vector(this.dimensions.x, 0);
    const vy = new Vector(0, this.dimensions.y);
    return [this.topLeft, this.topLeft.add(vx), this.topLeft.add(vy), this.bottomRight];
  }

  get topLeft() {
    return this.gameObject.position.add(this.offset);
  }

  get bottomRight() {
    return this.topLeft.add(this.dimensions);
  }

  get center() {
    return this.topLeft.add(this.bottomRight).scale(0.5);
  }

  /**
   * @param {BoxCollider} boxCollider
   * @returns {Collision?}
   */
  #hasCollisionWithBox(boxCollider) {
    // Source: http://blog.meltinglogic.com/2015/04/aabb-overlapping-area/
    const overlap = new Vector(
      Math.min(this.bottomRight.x, boxCollider.bottomRight.x) - Math.max(this.topLeft.x, boxCollider.topLeft.x),
      Math.min(this.bottomRight.y, boxCollider.bottomRight.y) - Math.max(this.topLeft.y, boxCollider.topLeft.y),
    );

    if (overlap.x > 0 && overlap.y > 0) {
      const fromBoxToSelf = this.center.subtract(boxCollider.center);

      const resolutionVector =
        overlap.x < overlap.y
          ? new Vector(Math.sign(fromBoxToSelf.x) * overlap.x, 0)
          : new Vector(0, Math.sign(fromBoxToSelf.y) * overlap.y);

      return new Collision(this.gameObject, boxCollider.gameObject, resolutionVector);
    }

    return null;
  }

  /**
   * @param {Collider} collider
   * @returns {Collision?}
   */
  hasCollisionWith(collider) {
    if (collider instanceof BoxCollider) {
      return this.#hasCollisionWithBox(collider);
    }

    throw new Error('Not supported collision detection.');
  }

  /**
   * @param {import("./internals/CanvasBuffer").CanvasBuffer} buffer
   */
  DEBUG_Draw(buffer) {
    const path = new Path2D();
    path.rect(this.topLeft.x, this.topLeft.y, this.dimensions.x, this.dimensions.y);
    buffer.draw(this.topLeft, new Shape(path, undefined, 'red'));
  }
}

export { BoxCollider };
