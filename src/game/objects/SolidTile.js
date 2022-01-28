import { AssetsManager } from '../assets';
import { BoxCollider, GameObject } from '../engine';
import { Vector } from '../shared';
// eslint-disable-next-line import/no-cycle
import { Pig } from './Pig';

/**
 * Associates colliding object classes with their restitutions.
 * If a class is not in this array it does not collide with SolidTile.
 */
const collidingObjects = Object.freeze([
  {
    Cls: Pig,
    restitution: 0.25,
  },
]);

class SolidTile extends GameObject {
  #sprite = AssetsManager.tileset[0][0];

  /**
   * @param {Object} props
   * @param {import('../shared').Sprite} props.sprite
   * @param {Vector} props.position
   */
  onActivate({ sprite, position }) {
    this.position = position;
    this.#sprite = sprite;
    this.setCollider(BoxCollider, [new Vector(this.#sprite.width, this.#sprite.height)]);
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    frame.buffer.draw(this.position, this.#sprite);
  }

  /**
   * @param {import('../shared').Collision} collision
   * @param {GameObject} target
   */
  // eslint-disable-next-line class-methods-use-this
  onCollision(collision, target) {
    const entry = collidingObjects.find(({ Cls }) => target instanceof Cls);
    if (entry) {
      const { restitution } = entry;
      const resolution = collision.resolutionVector.scale(-1);

      // eslint-disable-next-line no-param-reassign
      target.transform.position = target.transform.position.add(resolution);

      const normal = resolution.normalized();
      if (target.rigidbody.velocity.dot(normal) <= 0) {
        // Source: http://www.chrishecker.com/images/e/e7/Gdmphys3.pdf
        const j = -(1 + restitution) * target.rigidbody.velocity.dot(normal);
        const impulse = normal.scale(j);

        target.rigidbody.addVelocity(impulse);
      }
    }
  }
}

export { SolidTile };
