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
// eslint-disable-next-line import/no-cycle
import { SolidTile } from '../SolidTile';

const PIG_MAX_HP = 100;

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

  get facing() {
    return this.#facing;
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
