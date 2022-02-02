import { AssetsManager } from '../../assets';
import { PigStateAnimated, PIG_ANIMATION_INTERVAL } from './PigStateAnimated';

const PIG_RUNNING_SPEED = 1.5;
const PIG_JUMP_THRESHOLD = 32;
const PIG_ATTACK_RANGE = 12;

class PigRun extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].run);
  }

  update() {
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(this.pig.kingDirectionX * PIG_RUNNING_SPEED);

    if (this.pig.king.transform.origin.distanceSquaredTo(this.pig.transform.origin) <= PIG_ATTACK_RANGE ** 2) {
      this.pig.transitionState('attack');
    } else if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.transform.origin.y - this.pig.king.transform.origin.y > PIG_JUMP_THRESHOLD) {
      this.pig.transitionState('jump');
    }

    // In case we return to running after being hit
    if (this.pig.animation.isFinished) {
      this.pig.animation.reset(PIG_ANIMATION_INTERVAL, AssetsManager.pig[this.pig.variant].run);
    }
  }
}

export { PigRun };
