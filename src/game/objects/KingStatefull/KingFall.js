import { AssetsManager } from '../../assets';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingFall extends KingAnimated {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   */
  constructor(king) {
    super(king, [AssetsManager.kingFall], SPRITE_ANIMATION_UPDATE);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.isOnGround) {
      return this.king.transitionState('ground').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowRight')) {
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(1);
    }
    if (this.king.keyboard.pressed('ArrowLeft')) {
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(-1);
    }
    if (!this.king.keyboard.pressed('ArrowRight') && !this.king.keyboard.pressed('ArrowLeft')) {
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(0);
    }
    if (this.king.keyboard.pressed('x')) {
      return this.king.transitionState('attack').onUpdate(frame);
    }

    return super.update(frame);
  }
}

export { KingFall };
