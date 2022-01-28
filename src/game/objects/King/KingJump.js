import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingJump extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, [AssetsManager.kingJump], SPRITE_ANIMATION_UPDATE);
    king.rigidbody.addVelocity(new Vector(0, -6));
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.rigidbody.velocity.y > 0) {
      return this.king.transitionState('fall').onUpdate(frame);
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
      if (this.king.canAttack) {
        if (this.king.canAttack) {
          this.king.delayAttack();
          return this.king.transitionState('attack').onUpdate(frame);
        }
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }

    return super.update(frame);
  }
}

export { KingJump };
