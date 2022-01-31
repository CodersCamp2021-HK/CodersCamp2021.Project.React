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
    if (this.pig.rigidbody.velocity.y > 1) {
      this.pig.transitionState('fall');
    }
  }
}

export { PigIdle };
