import { BoxCollider, GameObject } from '../engine';
import { AssetsManager } from '../assets';
import { Vector } from '../shared';
// eslint-disable-next-line import/no-cycle
import { SolidTile } from './SolidTile';

const ANIMATION_INTERVAL = 6;

class Pig extends GameObject {
  #isStanding = false;

  /** @type {'idle' | 'fall'} */
  #state = 'fall';

  /**
   * @param {{ initialPos: Vector }} props
   */
  onActivate({ initialPos }) {
    this.animation.reset(ANIMATION_INTERVAL, AssetsManager.pig[this.#state]);

    this.transform.origin = initialPos ?? Vector.Zero;
    this.transform.width = this.#sprite.width;
    this.transform.height = this.#sprite.height;

    this.rigidbody.addGravity();

    this.setCollider(BoxCollider, [new Vector(24, 18), new Vector(5, 10)]);
  }

  onUpdate() {
    const previousState = this.#state;
    this.#state = this.#isStanding ? 'idle' : 'fall';

    if (this.#state !== previousState) {
      this.animation.reset(ANIMATION_INTERVAL, AssetsManager.pig[this.#state]);
    }

    this.#isStanding = false;
  }

  /**
   * @param {import('../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {
    if (target instanceof SolidTile && collision.resolutionVector.y < 0) {
      this.#isStanding = true;
    }
  }

  get #sprite() {
    return /** @type {import('../shared').Sprite} */ (this.animation.sprite);
  }
}

export { Pig };
