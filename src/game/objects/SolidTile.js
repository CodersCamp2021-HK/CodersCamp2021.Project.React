import { AssetsManager } from '../assets';
import { BoxCollider, GameObject } from '../engine';
import { Vector } from '../shared';

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
   * @param {GameObject} object
   * @param {import('../shared').Collision} collision
   * @param {number} restitution https://en.wikipedia.org/wiki/Coefficient_of_restitution
   * @return {import('../shared').Vector} normal vector from the solid to the object
   */
  static resolveCollisionWith(object, collision, restitution) {
    // eslint-disable-next-line no-param-reassign
    object.transform.position = object.transform.position.add(collision.resolutionVector);

    const normal = collision.resolutionVector.normalized();
    if (object.rigidbody.velocity.dot(normal) <= 0) {
      // Source: http://www.chrishecker.com/images/e/e7/Gdmphys3.pdf
      const j = -(1 + restitution) * object.rigidbody.velocity.dot(normal);
      const impulse = normal.scale(j);

      object.rigidbody.addVelocity(impulse);
    }

    return normal;
  }
}

export { SolidTile };
