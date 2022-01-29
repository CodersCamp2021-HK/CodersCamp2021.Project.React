import { AssetsManager } from '../../assets';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 5;

class KingAttack extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.attack, SPRITE_ANIMATION_UPDATE, true);
  }

  /**
   * @param {import("../../shared/Frame").Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      if (this.king.isOnGround) {
        return this.king.transitionState('idle').onUpdate(frame);
      }
      return this.king.transitionState('fall').onUpdate(frame);
    }
    return super.update(frame);
  }
}

export { KingAttack };