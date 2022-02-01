import { AssetsManager } from '../../assets';
import { PigState } from './PigState';

class PigRun extends PigState {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.run);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    // TODO: running logic

    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else {
      // TODO: attacking logic
    }
  }
}

export { PigRun };
