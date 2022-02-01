import { AssetsManager } from '../../assets';
import { PigStateAnimated } from './PigStateAnimated';

class PigIdle extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig.idle);
  }

  update() {
    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.kingWasSpotted) {
      this.pig.transitionState('run');
    }
  }
}

export { PigIdle };
