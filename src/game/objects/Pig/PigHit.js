import { AssetsManager } from '../../assets';
import { PigStateAnimated } from './PigStateAnimated';

class PigHit extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.hit, true);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.animation.isFinished) {
      if (this.pig.hp <= 0) {
        this.pig.transitionState('dead');
      } else {
        this.pig.returnToPreviousState();
      }
    }
  }
}

export { PigHit };