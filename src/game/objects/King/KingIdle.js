import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingIdle extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.idle, SPRITE_ANIMATION_UPDATE);
    // eslint-disable-next-line no-param-reassign
    king.rigidbody.velocity = Vector.Zero;
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.keyboard.pressed('ArrowLeft')) {
      this.king.flipLeft();
      return this.king.transitionState('runLeft').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowRight')) {
      this.king.flipRight();
      return this.king.transitionState('runRight').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.delayAttack();
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    if (this.king.keyboard.pressed('ArrowUp')) {
      return this.king.transitionState('jump').onUpdate(frame);
    }
    if (this.king.rigidbody.velocity.y > 1) {
      return this.king.transitionState('fall').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('d')) {
      return this.king.transitionState('dead').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('h')) {
      return this.king.transitionState('hit').onUpdate(frame);
    }
    return super.update(frame);
  }
}

export { KingIdle };
