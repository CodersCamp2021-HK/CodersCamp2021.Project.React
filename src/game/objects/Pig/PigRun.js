import { AssetsManager } from '../../assets';
import { PigStateAnimated } from './PigStateAnimated';

class PigRun extends PigStateAnimated {
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
