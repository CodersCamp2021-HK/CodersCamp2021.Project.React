import { AssetsManager } from '../../assets';
import { KING_DEFAULT_ANIMATION_INTERVAL, KING_AIR_HORIZONTAL_VELOCITY, KING_JUMP_IMPULSE } from '../../config';
import { Vector } from '../../shared';
import { KingAnimated } from './KingAnimated';

class KingJump extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.jump, KING_DEFAULT_ANIMATION_INTERVAL);
    king.rigidbody.addVelocity(new Vector(0, -KING_JUMP_IMPULSE));
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.rigidbody.velocity.y > 0) {
      return this.king.transitionState('fall').onUpdate(frame);
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

export { KingJump };
