import { BoxCollider, GameObject } from '../../engine';
import { Vector } from '../../shared';
import { PigIdle } from './PigIdle';
import { PigFall } from './PigFall';
import { PigGround } from './PigGround';
import { PigRun } from './PigRun';
import { PigJump } from './PigJump';
import { PigAttack } from './PigAttack';
import { PigHit } from './PigHit';
import { PigDead } from './PigDead';
import { PIG_DEFAULT_FACING } from './PigStateAnimated';
import { KingSwing } from '../King/KingSwing';
// eslint-disable-next-line import/no-cycle
import { SolidTile } from '../SolidTile';

const PIG_MAX_HP = 2;
const PIG_HALF_DETECTION_SIZE = new Vector(64, 32);

const stateMap = Object.freeze({
  idle: PigIdle,
  fall: PigFall,
  ground: PigGround,
  run: PigRun,
  jump: PigJump,
  attack: PigAttack,
  hit: PigHit,
  dead: PigDead,
});

/**
 * @typedef {keyof stateMap} PigStateKey
 */

class Pig extends GameObject {
  /** @type {import('./PigStateAnimated').PigStateAnimated?} */
  #state = null;

  /** @type {import('./PigStateAnimated').PigStateAnimated?} */
  #previousState = null;

  /** @type {'left' | 'right'} */
  #facing = PIG_DEFAULT_FACING;

  #isStanding = false;

  #kingWasSpotted = false;

  #hp = PIG_MAX_HP;

  /** @type {import('../King').King?} */
  #king = null;

  get facing() {
    return this.#facing;
  }

  get facingVector() {
    return Vector.Zero.setX(this.#facing === 'left' ? -1 : 1);
  }

  get isStanding() {
    return this.#isStanding;
  }

  get kingWasSpotted() {
    return this.#kingWasSpotted;
  }

  get hp() {
    return this.#hp;
  }

  get isFalling() {
    return this.rigidbody.velocity.y > 1;
  }

  get king() {
    return /** @type {import('../King').King} */ (this.#king);
  }

  get kingDirectionX() {
    return Math.sign(this.king.transform.origin.subtract(this.transform.origin).x);
  }

  #damage() {
    this.#kingWasSpotted = true;

    if (!(this.#state instanceof PigHit || this.#state instanceof PigDead)) {
      this.#hp -= 1;
      this.transitionState('hit');
    }
  }

  /**
   * @param {{ initialPos: Vector, level: import('../../scenes/LevelScene').LevelScene, facing?: 'left' | 'right' }} args
   */
  onActivate({ initialPos, level, facing }) {
    this.#state = new PigIdle(this);

    this.transform.origin = initialPos ?? Vector.Zero;
    this.transform.width = 34;
    this.transform.height = 28;
    this.#facing = facing ?? PIG_DEFAULT_FACING;

    this.rigidbody.addGravity();
    this.setCollider(BoxCollider, [new Vector(24, 18), new Vector(5, 10)]);

    this.#king = level.king;
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  onUpdate(frame) {
    if (!this.#kingWasSpotted) {
      const detectionCenter = this.transform.origin.add(this.facingVector.scale(PIG_HALF_DETECTION_SIZE.x));
      const detectionTopLeft = detectionCenter.subtract(PIG_HALF_DETECTION_SIZE);
      const detectionBottomRight = detectionCenter.add(PIG_HALF_DETECTION_SIZE);

      if (
        detectionTopLeft.x <= this.king.transform.origin.x &&
        this.king.transform.origin.x <= detectionBottomRight.x &&
        detectionTopLeft.y <= this.king.transform.origin.y &&
        this.king.transform.origin.y <= detectionBottomRight.y
      ) {
        this.#kingWasSpotted = true;
      }
    } else if (!(this.#state instanceof PigDead)) {
      this.#facing = this.kingDirectionX <= 0 ? 'left' : 'right';
      this.animation.flipped = this.#facing !== PIG_DEFAULT_FACING;
    }

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
    } else if (target instanceof KingSwing) {
      this.#damage();
    }
  }

  /**
   * @param {PigStateKey} key
   */
  transitionState(key) {
    this.#previousState = this.#state;
    this.#state = new stateMap[key](this);
  }

  returnToPreviousState() {
    [this.#state, this.#previousState] = [this.#previousState, this.#state];
  }
}

export { Pig };
