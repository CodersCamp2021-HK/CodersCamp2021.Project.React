import { Vector } from '../../shared';
import { GameObject, BoxCollider } from '../../engine';
import { TrexRun } from './TrexRun';
import { TrexBend } from './TrexBend';
import { TrexJump } from './TrexJump';

/**
 * @typedef {'run' | 'jump' | 'bend' | 'colision'} TrexStateKey
 */

class TrexStatefull extends GameObject {
  /**
   * @type {import('./TrexState').TrexState | undefined}
   */
  #state;

  onActivate() {
    this.setCollider(BoxCollider, [new Vector(0, 0)]);
    this.#state = new TrexRun(this);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  onUpdate(frame) {
    this.#state?.update(frame);
  }

  onCollision() {
    this.ui.setLose();
    this.transitionState('colision');
  }

  /**
   * @param {TrexStateKey} key
   */
  transitionState(key) {
    switch (key) {
      case 'bend': {
        this.#state = new TrexBend(this);
        break;
      }

      case 'jump': {
        this.#state = new TrexJump(this);
        break;
      }

      case 'run': {
        this.#state = new TrexRun(this);
        break;
      }

      default: {
        this.#state = undefined;
      }
    }

    return this;
  }
}

export { TrexStatefull };