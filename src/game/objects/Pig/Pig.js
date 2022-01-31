import { BoxCollider, GameObject } from '../../engine';
import { Vector } from '../../shared';
import { PigIdle } from './PigIdle';
import { PigFall } from './PigFall';
import { PIG_DEFAULT_FACING } from './PigState';
// eslint-disable-next-line import/no-cycle
import { SolidTile } from '../SolidTile';

const PIG_MAX_HP = 100;

class Pig extends GameObject {
  /** @type {import('./PigState').PigState?} */
  #state = null;

  /** @type {'left' | 'right'} */
  #facing = PIG_DEFAULT_FACING;

  #isStanding = false;

  #kingWasSpotted = false;

  #hp = PIG_MAX_HP;

  get facing() {
    return this.#facing;
  }

  get isStanding() {
    return this.#isStanding;
  }

  /**
   * @param {{ initialPos: Vector, facing?: 'left' | 'right' }} props
   */
  onActivate({ initialPos, facing }) {
    this.#state = new PigIdle(this);

    this.transform.origin = initialPos ?? Vector.Zero;
    this.transform.width = 34;
    this.transform.height = 28;
    this.#facing = facing ?? PIG_DEFAULT_FACING;

    this.rigidbody.addGravity();
    this.setCollider(BoxCollider, [new Vector(24, 18), new Vector(5, 10)]);
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  onUpdate(frame) {
    this.#state?.update(frame);
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

  /**
   * @param {'idle' | 'fall'} key
   */
  transitionState(key) {
    switch (key) {
      case 'idle':
        this.#state = new PigIdle(this);
        break;
      case 'fall':
        this.#state = new PigFall(this);
        break;
      default:
        this.#state = null;
        break;
    }
  }
}

export { Pig };
