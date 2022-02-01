import { AssetsManager } from '../../assets';
import { PigStateAnimated } from './PigStateAnimated';

const PIG_RUNNING_SPEED = 1.5;
const PIG_JUMP_THRESHOLD = 32;

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
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(this.pig.kingDirectionX * PIG_RUNNING_SPEED);

    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.transform.origin.y - this.pig.king.transform.origin.y > PIG_JUMP_THRESHOLD) {
      this.pig.transitionState('jump');
    }
  }
}

export { PigRun };
