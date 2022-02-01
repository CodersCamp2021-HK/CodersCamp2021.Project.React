import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { PigState } from './PigState';

const PIG_JUMP_IMPULSE = new Vector(0, -6);

class PigJump extends PigState {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.jump);
    pig.rigidbody.addVelocity(PIG_JUMP_IMPULSE);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    }
  }
}

export { PigJump };
