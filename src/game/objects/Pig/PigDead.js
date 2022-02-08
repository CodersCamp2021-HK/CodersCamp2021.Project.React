import { AssetsManager } from '../../assets';
import { PigStateAnimated } from './PigStateAnimated';

class PigDead extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].dead, true);
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(0);
  }

  // eslint-disable-next-line consistent-return
  update() {
    if (this.pig.animation.isFinished) {
      if (this.pig.variant === 'king') return this.pig.ui.gameOver();
      this.pig.destroy(this.pig);
    }
  }
}

export { PigDead };
