import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingIdle extends KingAnimated {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   */
  constructor(king) {
    super(
      king,
      [
        AssetsManager.kingIdle01,
        AssetsManager.kingIdle02,
        AssetsManager.kingIdle03,
        AssetsManager.kingIdle04,
        AssetsManager.kingIdle05,
        AssetsManager.kingIdle06,
        AssetsManager.kingIdle07,
        AssetsManager.kingIdle08,
        AssetsManager.kingIdle09,
        AssetsManager.kingIdle10,
        AssetsManager.kingIdle11,
      ],
      SPRITE_ANIMATION_UPDATE,
    );
    // eslint-disable-next-line no-param-reassign
    king.rigidbody.velocity = Vector.Zero;
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.keyboard.pressed('ArrowLeft')) {
      return this.king.transitionState('runLeft').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowRight')) {
      return this.king.transitionState('runRight').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.canAttack = false;
        setTimeout(() => {
          this.king.canAttack = true;
        }, 500);
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    if (this.king.keyboard.pressed('ArrowUp')) {
      return this.king.transitionState('jump').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowDown')) {
      return this.king.transitionState('doorIn').onUpdate(frame);
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
