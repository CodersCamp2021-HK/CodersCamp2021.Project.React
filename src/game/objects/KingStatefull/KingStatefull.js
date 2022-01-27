import { Vector } from '../../shared';
import { GameObject, BoxCollider, resolveCollisionsWithSolid } from '../../engine';
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
import { SolidTile } from '../SolidTile';

/**
 * @typedef {'attack' | 'collision' | 'dead' | 'doorIn' | 'doorOut' | 'fall' | 'ground' | 'hit' | 'idle' | 'jump' | 'runLeft' | 'runRight' } KingStateKey
 */

class KingStatefull extends GameObject {
  /**
   * @type {import('./KingState').KingState | undefined}
   */
  #state;

  #isOnGround = false;

  #canAttack = true;

  get isOnGround() {
    return this.#isOnGround;
  }

  get canAttack() {
    return this.#canAttack;
  }

  set canAttack(canAttack) {
    this.#canAttack = canAttack;
  }

  /**
   * @param {Object} props
   * @param {Vector} props.position
   */
  onActivate({ position }) {
    this.rigidbody.addGravity();
    this.transform.origin = position;
    this.setCollider(BoxCollider, [new Vector(0, 0)]);
    this.#state = new KingDoorOut(this);
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  onUpdate(frame) {
    this.#state?.update(frame);
    this.#isOnGround = false;
  }

  /**
   * @param {import('../../shared').Collision} _collision
   * @param {GameObject} target
   */
  onCollision(_collision, target) {
    if (target instanceof SolidTile) {
      const normal = resolveCollisionsWithSolid(this, target, 0);
      if (normal.y < 0) {
        this.#isOnGround = true;
      }
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

export { KingStatefull };
