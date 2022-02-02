import { AssetsManager } from '../../assets';
import { PIG_AIR_HORIZONTAL_VELOCITY, PIG_JUMP_IMPULSE } from '../../config';
import { Vector } from '../../shared';
import { PigStateAnimated } from './PigStateAnimated';

class PigJump extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].jump);
    pig.rigidbody.addVelocity(new Vector(0, -PIG_JUMP_IMPULSE));
  }

  update() {
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(
      this.pig.kingDirectionX * PIG_AIR_HORIZONTAL_VELOCITY,
    );

    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.isStanding) {
      this.pig.transitionState('ground');
    }
  }
}

export { PigJump };
