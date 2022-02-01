import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { PigStateAnimated } from './PigStateAnimated';

const PIG_JUMP_HORIZONTAL_SPEED = 0.5;
const PIG_JUMP_IMPULSE = new Vector(0, -5);

class PigJump extends PigStateAnimated {
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
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(this.pig.kingDirectionX * PIG_JUMP_HORIZONTAL_SPEED);

    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.isStanding) {
      this.pig.transitionState('ground');
    }
  }
}

export { PigJump };
