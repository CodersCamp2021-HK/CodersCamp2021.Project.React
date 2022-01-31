import { AssetsManager } from '../../assets';
import { PigState } from './PigState';

class PigFall extends PigState {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.fall);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.isStanding) {
      this.pig.transitionState('idle');
    }
  }
}

export { PigFall };
