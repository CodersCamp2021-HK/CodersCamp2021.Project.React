import { AssetsManager } from '../../assets';
import { PigState } from './PigState';

class PigDead extends PigState {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.dead, true);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.animation.isFinished) {
      this.pig.destroy(this.pig);
    }
  }
}

export { PigDead };
