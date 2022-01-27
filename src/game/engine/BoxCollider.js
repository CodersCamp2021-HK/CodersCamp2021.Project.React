import { Shape, Vector } from '../shared';
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

  get lines() {
    return [
      [this.position.x, this.position.x + this.#box.x],
      [this.position.y, this.position.y + this.#box.y],
    ];
  }

  get position() {
    return this.gameObject.position;
  }

  /**
   * @param {Collider} collider
   */
  hasCollisionWith(collider) {
    if (collider instanceof BoxCollider) {
      for (const point of collider.points) {
        if (
          this.position.x <= point.x &&
          point.x <= this.position.x + this.box.x &&
          this.position.y <= point.y &&
          point.y <= this.position.y + this.box.y
        ) {
          return true;
        }
      }
      return false;
    }

    throw new Error('Not supported collision detection.');
  }

  /**
   * @param {import("./internals/CanvasBuffer").CanvasBuffer} buffer
   */
  DEBUG_Draw(buffer) {
    const path = new Path2D();
    path.rect(this.position.x, this.position.y, this.box.x, this.box.y);
    buffer.draw(this.position, new Shape(path, undefined, 'red'));
  }
}

export { BoxCollider };
