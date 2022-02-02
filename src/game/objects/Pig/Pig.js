import { BoxCollider, GameObject } from '../../engine';
import { Vector } from '../../shared';
import { PIG_BASIC_MAX_HP, PIG_DEFAULT_ASSET_FACING, PIG_DETECTION_SIZE_HALF, PIG_KING_MAX_HP } from '../../config';
import { PigIdle } from './PigIdle';
import { PigFall } from './PigFall';
import { PigGround } from './PigGround';
import { PigRun } from './PigRun';
import { PigJump } from './PigJump';
import { PigAttack } from './PigAttack';
import { PigHit } from './PigHit';
import { PigDead } from './PigDead';
import { KingSwing } from '../King/KingSwing';
// eslint-disable-next-line import/no-cycle
import { SolidTile } from '../SolidTile';

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

  /** @type {'basic' | 'king'} */
  #variant = 'basic';

  /** @type {'left' | 'right'} */
  #facing = PIG_DEFAULT_ASSET_FACING;

  #isStanding = false;

  #kingWasSpotted = false;

  #hp = PIG_BASIC_MAX_HP;

  /** @type {import('../King').King?} */
  #king = null;

  get variant() {
    return this.#variant;
  }

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
   * @param {{ initialPos: Vector, level: import('../../scenes/LevelScene').LevelScene, variant: 'basic' | 'king', facing?: 'left' | 'right' }} args
   */
  onActivate({ initialPos, level, variant, facing }) {
    this.transform.origin = initialPos ?? Vector.Zero;
    this.transform.width = 34;
    this.transform.height = 28;
    this.#variant = variant ?? 'basic';
    this.#facing = facing ?? PIG_DEFAULT_ASSET_FACING;
    this.#hp = variant === 'king' ? PIG_KING_MAX_HP : PIG_BASIC_MAX_HP;

    this.#state = new PigIdle(this);
    this.animation.flipped = this.#facing !== PIG_DEFAULT_FACING;

    this.rigidbody.addGravity();
    this.setCollider(BoxCollider, [new Vector(24, 18), new Vector(5, 10)]);

    this.#king = level.king;
  }

  /**
   * @param {import('../../shared/Frame').Frame} _frame
   */
  onUpdate(_frame) {
    if (!this.#kingWasSpotted) {
      const detectionCenter = this.transform.origin.add(this.facingVector.scale(PIG_DETECTION_SIZE_HALF.x));
      const detectionTopLeft = detectionCenter.subtract(PIG_DETECTION_SIZE_HALF);
      const detectionBottomRight = detectionCenter.add(PIG_DETECTION_SIZE_HALF);

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
      this.animation.flipped = this.#facing !== PIG_DEFAULT_ASSET_FACING;
    }

    this.#state?.update();
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
