import { Vector } from '../../shared';
import { GameObject, BoxCollider } from '../../engine';
import { KingAttack } from './KingAttack';
import { KingDead } from './KingDead';
import { KingDoorIn } from './KingDoorIn';
import { KingDoorOut } from './KingDoorOut';
import { KingFall } from './KingFall';
import { KingGround } from './KingGround';
import { KingIdle } from './KingIdle';
import { KingJump } from './KingJump';
import { KingRunLeft } from './KingRunLeft';
import { KingRunRight } from './KingRunRight';

/**
 * @typedef {'attack' | 'collision' | 'dead' | 'doorIn' | 'doorOut' | 'fall' | 'ground' | 'idle' | 'jump' | 'runLeft' | 'runRight' } KingStateKey
 */

class KingStatefull extends GameObject {
  /**
   * @type {import('./KingState').KingState | undefined}
   */
  #state;

  onActivate() {
    this.setCollider(BoxCollider, [new Vector(0, 0)]);
    this.#state = new KingIdle(this);
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  onUpdate(frame) {
    this.#state?.update(frame);
  }

  onCollision() {
    this.ui.setLose();
    this.transitionState('collision');
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
