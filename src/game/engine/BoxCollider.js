import { Vector2D } from '../shared';
import { Collider } from './Collider';

class BoxCollider extends Collider {
  #box;

  /**
   * @param {import('./GameObject').GameObject} gameObject
   * @param {import('../shared').Vector2D} box
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
   * @returns {[import('../shared').Vector2D, import('../shared').Vector2D, import('../shared').Vector2D, import('../shared').Vector2D]}
   */
  get points() {
    const { position } = this.gameObject;
    const vx = Vector2D.Zero.setX(this.#box.x);
    const vy = Vector2D.Zero.setY(this.#box.y);
    return [position, position.add(vx), position.add(vy), position.add(vx).add(vy)];
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
}

export { BoxCollider };
