import { AssetsManager } from '../../assets';
import { KING_DEFAULT_ANIMATION_INTERVAL, KING_AIR_HORIZONTAL_VELOCITY } from '../../config';
import { KingAnimated } from './KingAnimated';

class KingFall extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.fall, KING_DEFAULT_ANIMATION_INTERVAL);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.isOnGround) {
      return this.king.transitionState('ground').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowRight')) {
      this.king.flipRight();
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(KING_AIR_HORIZONTAL_VELOCITY);
    }
    if (this.king.keyboard.pressed('ArrowLeft')) {
      this.king.flipLeft();
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(-KING_AIR_HORIZONTAL_VELOCITY);
    }
    if (!this.king.keyboard.pressed('ArrowRight') && !this.king.keyboard.pressed('ArrowLeft')) {
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(0);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.delayAttack();
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    return super.update(frame);
  }
}

export { KingFall };
