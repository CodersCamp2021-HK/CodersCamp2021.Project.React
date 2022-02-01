import { AssetsManager } from '../../assets';
import { PigState } from './PigState';

class PigIdle extends PigState {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.idle);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.kingWasSpotted) {
      this.pig.transitionState('run');
    }
  }
}

export { PigIdle };
