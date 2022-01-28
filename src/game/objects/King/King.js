import { Vector } from '../../shared';
import { GameObject, BoxCollider } from '../../engine';
import { KingAttack } from './KingAttack';
import { KingDead } from './KingDead';
import { KingDoorIn } from './KingDoorIn';
import { KingDoorOut } from './KingDoorOut';
import { KingFall } from './KingFall';
import { KingGround } from './KingGround';
import { KingHit } from './KingHit';
import { KingIdle } from './KingIdle';
import { KingJump } from './KingJump';
import { KingRunLeft } from './KingRunLeft';
import { KingRunRight } from './KingRunRight';
// eslint-disable-next-line import/no-cycle
import { SolidTile } from '../SolidTile';

/**
 * @typedef {'attack' | 'collision' | 'dead' | 'doorIn' | 'doorOut' | 'fall' | 'ground' | 'hit' | 'idle' | 'jump' | 'runLeft' | 'runRight' } KingStateKey
 */

class King extends GameObject {
  /**
   * @type {import('./KingState').KingState | undefined}
   */
  #state;

  #isOnGround = false;

  #canAttack = true;

  #attackDelay = 500;

  get isOnGround() {
    return this.#isOnGround;
  }

  get canAttack() {
    return this.#canAttack;
  }

  delayAttack() {
    this.#canAttack = false;
    setTimeout(() => {
      this.#canAttack = true;
    }, this.#attackDelay);
  }

  /**
   * @param {Object} props
   * @param {Vector} props.initialPos
   */
  onActivate({ initialPos }) {
    this.#state = new KingDoorOut(this);
    this.rigidbody.addGravity();
    this.transform.origin = initialPos ?? Vector.Zero;
    this.transform.width = this.animation.sprite?.width ?? 0;
    this.transform.height = this.animation.sprite?.height ?? 0;
    this.setCollider(BoxCollider, [new Vector(0, 0)]);
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  onUpdate(frame) {
    this.#state?.update(frame);
    this.#isOnGround = false;
  }

  /**
   * @param {import('../../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {
    if (target instanceof SolidTile && collision.resolutionVector.y < 0) {
      this.#isOnGround = true;
    }
  }

  /**
   * @param {KingStateKey} key
   */
  transitionState(key) {
    switch (key) {
      case 'attack': {
        this.#state = new KingAttack(this);
        break;
      }

      case 'dead': {
        this.#state = new KingDead(this);
        break;
      }

      case 'doorIn': {
        this.#state = new KingDoorIn(this);
        break;
      }

      case 'doorOut': {
        this.#state = new KingDoorOut(this);
        break;
      }

      case 'fall': {
        this.#state = new KingFall(this);
        break;
      }

      case 'ground': {
        this.#state = new KingGround(this);
        break;
      }

      case 'hit': {
        this.#state = new KingHit(this);
        break;
      }

      case 'idle': {
        this.#state = new KingIdle(this);
        break;
      }

      case 'jump': {
        this.#state = new KingJump(this);
        break;
      }

      case 'runLeft': {
        this.#state = new KingRunLeft(this);
        break;
      }

      case 'runRight': {
        this.#state = new KingRunRight(this);
        break;
      }

      default: {
        this.#state = undefined;
      }
    }
    return this;
  }
}

export { King };
