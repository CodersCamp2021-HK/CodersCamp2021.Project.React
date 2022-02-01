import { AssetsManager } from '../../assets';
import { PigState } from './PigState';

class PigHit extends PigState {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.hit, true);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.animation.isFinished) {
      if (this.pig.hp <= 0) {
        this.pig.transitionState('dead');
      } else {
        // TODO: return to previous state
      }
    }
  }
}

export { PigHit };
