import { AssetsManager } from '../../assets';
import { PigStateAnimated } from './PigStateAnimated';

class PigGround extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.ground, true);
  }

  /**
   * @param {import('../../shared').Frame} _frame
   */
  update(_frame) {
    if (this.pig.animation.isFinished) {
      if (this.pig.kingWasSpotted) {
        this.pig.transitionState('run');
      } else {
        this.pig.transitionState('idle');
      }
    }
  }
}

export { PigGround };
