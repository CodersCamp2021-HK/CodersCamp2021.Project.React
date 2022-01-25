import { SolidTile } from '.';
import { AssetsManager } from '../assets';
import { BoxCollider, GameObject } from '../engine';
import { Vector } from '../shared';

const ANIMATION_INTERVAL = 6;

class Pig extends GameObject {
  /**
   * @param {{ initialPos: Vector }} props
   */
  onActivate({ initialPos }) {
    this.animation.reset(ANIMATION_INTERVAL, AssetsManager.pig.idle);

    this.transform.origin = initialPos ?? Vector.Zero;
    this.transform.width = this.#sprite.width;
    this.transform.height = this.#sprite.height;

    this.rigidbody.addGravity();

    this.setCollider(BoxCollider, [new Vector(this.#sprite.width, this.#sprite.height)]);
  }

  /**
   * @param {import('../shared').Collision} _collision
   * @param {GameObject} target
   */
  onCollision(_collision, target) {
    if (target instanceof SolidTile) {
      const pigLines = /** @type {BoxCollider} */ (this.collider).lines;
      const boxLines = /** @type {BoxCollider} */ (target.collider).lines;
      const fromBoxToPig = this.transform.origin.subtract(target.transform.origin);

      // Source: http://blog.meltinglogic.com/2015/04/aabb-overlapping-area/
      const xOverlap = Math.min(pigLines[0][1], boxLines[0][1]) - Math.max(pigLines[0][0], boxLines[0][0]);
      const yOverlap = Math.min(pigLines[1][1], boxLines[1][1]) - Math.max(pigLines[1][0], boxLines[1][0]);

      const { resolutionOffset, newVelocity } =
        xOverlap < yOverlap
          ? {
              // Collision on the X axis
              resolutionOffset: new Vector(Math.sign(fromBoxToPig.x) * xOverlap, 0),
              newVelocity: this.rigidbody.velocity.setX(0),
            }
          : {
              // Collision on the Y axis
              resolutionOffset: new Vector(0, Math.sign(fromBoxToPig.y) * yOverlap),
              newVelocity: this.rigidbody.velocity.setY(0),
            };

      this.rigidbody.setVelocity(newVelocity);
      this.transform.position = this.transform.position.add(resolutionOffset);
    }
  }

  get #sprite() {
    return /** @type {import('../shared').Sprite} */ (this.animation.sprite);
  }
}

export { Pig };
