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
   * @param {BoxCollider} boxCollider
   * @returns {Collision?}
   */
  #hasCollisionWithBox(boxCollider) {
    for (const point of boxCollider.points) {
      if (
        this.position.x < point.x &&
        point.x < this.position.x + this.box.x &&
        this.position.y < point.y &&
        point.y < this.position.y + this.box.y
      ) {
        const pigLines = this.lines;
        const boxLines = boxCollider.lines;
        const fromBoxToPig = this.gameObject.transform.origin.subtract(boxCollider.gameObject.transform.origin);

        // Source: http://blog.meltinglogic.com/2015/04/aabb-overlapping-area/
        const xOverlap = Math.min(pigLines[0][1], boxLines[0][1]) - Math.max(pigLines[0][0], boxLines[0][0]);
        const yOverlap = Math.min(pigLines[1][1], boxLines[1][1]) - Math.max(pigLines[1][0], boxLines[1][0]);

        const resolutionOffset =
          xOverlap < yOverlap
            ? new Vector(Math.sign(fromBoxToPig.x) * xOverlap, 0)
            : new Vector(0, Math.sign(fromBoxToPig.y) * yOverlap);

        return new Collision(this.gameObject, boxCollider.gameObject, resolutionOffset);
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
    path.rect(this.position.x, this.position.y, this.box.x, this.box.y);
    buffer.draw(this.position, new Shape(path, undefined, 'red'));
  }
}

export { BoxCollider };
