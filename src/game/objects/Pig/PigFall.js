import { AssetsManager } from '../../assets';
import { PigStateAnimated } from './PigStateAnimated';

class PigFall extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.fall);
  }

  update() {
    if (this.pig.isStanding) {
      this.pig.transitionState('ground');
    }
  }
}

export { PigFall };
