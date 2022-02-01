import { AssetsManager } from '../../assets';
import { PigStateAnimated } from './PigStateAnimated';
import { PigSwing } from './PigSwing';

const PIG_ATTACK_OFFSET = 8;

class PigAttack extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.attack, true);
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(0);

    this.pig.create(PigSwing, {
      args: {
        attackCenter: this.pig.transform.origin.add(this.pig.facingVector.scale(PIG_ATTACK_OFFSET)),
      },
    });
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.animation.isFinished) {
      this.pig.transitionState('run');
    }
  }
}

export { PigAttack };
