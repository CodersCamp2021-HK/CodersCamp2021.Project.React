import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 3;

class KingRunLeft extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.run, SPRITE_ANIMATION_UPDATE);
    king.rigidbody.addVelocity(new Vector(-2, 0));
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  update(frame) {
    if (this.king.keyboard.pressed('ArrowUp')) {
      return this.king.transitionState('jump').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.delayAttack();
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    if (!this.king.keyboard.pressed('ArrowLeft')) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    return super.update(frame);
  }
}

export { KingRunLeft };
