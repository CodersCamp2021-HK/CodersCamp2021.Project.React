import { AssetsManager } from '../../assets';
import { PigState } from './PigState';

class PigAttack extends PigState {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.attack, true);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.animation.isFinished) {
      this.pig.transitionState('run');
    }
  }
}

export { PigAttack };
