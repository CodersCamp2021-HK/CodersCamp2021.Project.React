import { BoxCollider, GameObject } from '../../engine';
import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { PigIdle } from './PigIdle';
// eslint-disable-next-line import/no-cycle
import { SolidTile } from '../SolidTile';

const PIG_ANIMATION_INTERVAL = 10;
const PIG_MAX_HP = 100;
const PIG_DEFAULT_FACING = 'left';

class Pig extends GameObject {
  /** @type {import('./PigState').PigState} */
  #state = new PigIdle(this);

  /** @type {'left' | 'right'} */
  #facing = PIG_DEFAULT_FACING;

  #isStanding = false;

  #kingWasSpotted = false;

  #hp = PIG_MAX_HP;

  /**
   * @param {{ initialPos: Vector, facing?: 'left' | 'right' }} props
   */
  onActivate({ initialPos, facing }) {
    this.transform.origin = initialPos ?? Vector.Zero;
    this.transform.width = 34;
    this.transform.height = 28;
    this.#facing = facing ?? PIG_DEFAULT_FACING;
    this.animation.reset(PIG_ANIMATION_INTERVAL, AssetsManager.pig.idle);

    this.rigidbody.addGravity();
    this.setCollider(BoxCollider, [new Vector(24, 18), new Vector(5, 10)]);
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  onUpdate(frame) {
    this.#state.update(frame);
    this.#isStanding = false;
  }

  /**
   * @param {import('../../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {
    if (target instanceof SolidTile && collision.resolutionVector.y < 0) {
      this.#isStanding = true;
    }
  }
}

export { Pig };
