import { Collision, Shape, Vector } from '../shared';
import { Collider } from './internals/Collider';

class BoxCollider extends Collider {
  #box;

  /**
   * @param {import('./GameObject').GameObject} gameObject
   * @param {import('../shared').Vector} box
   */
  constructor(gameObject, box) {
    super(gameObject);
    this.#box = box;
  }

  get box() {
    return this.#box;
  }

  set box(val) {
    this.#box = val;
  }

  /**
   * @returns {[import('../shared').Vector, import('../shared').Vector, import('../shared').Vector, import('../shared').Vector]}
   */
  get points() {
    const { position } = this.gameObject;
    const vx = Vector.Zero.setX(this.#box.x);
    const vy = Vector.Zero.setY(this.#box.y);
    return [position, position.add(vx), position.add(vy), position.add(vx).add(vy)];
  }

  get topLeft() {
    return this.gameObject.position;
  }

  get bottomRight() {
    return this.topLeft.add(this.#box);
  }

  /**
   * @param {BoxCollider} boxCollider
   * @returns {Collision?}
   */
  #hasCollisionWithBox(boxCollider) {
    for (const point of boxCollider.points) {
      if (
        this.topLeft.x < point.x &&
        point.x < this.bottomRight.x &&
        this.topLeft.y < point.y &&
        point.y < this.bottomRight.y
      ) {
        const fromBoxToSelf = this.gameObject.transform.origin.subtract(boxCollider.gameObject.transform.origin);

        // Source: http://blog.meltinglogic.com/2015/04/aabb-overlapping-area/
        const overlap = new Vector(
          Math.min(this.bottomRight.x, boxCollider.bottomRight.x) - Math.max(this.topLeft.x, boxCollider.topLeft.x),
          Math.min(this.bottomRight.y, boxCollider.bottomRight.y) - Math.max(this.topLeft.y, boxCollider.topLeft.y),
        );

        const resolutionVector =
          overlap.x < overlap.y
            ? new Vector(Math.sign(fromBoxToSelf.x) * overlap.x, 0)
            : new Vector(0, Math.sign(fromBoxToSelf.y) * overlap.y);

        return new Collision(this.gameObject, boxCollider.gameObject, resolutionVector);
      }
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
    path.rect(this.topLeft.x, this.topLeft.y, this.box.x, this.box.y);
    buffer.draw(this.topLeft, new Shape(path, undefined, 'red'));
  }
}

export { BoxCollider };
