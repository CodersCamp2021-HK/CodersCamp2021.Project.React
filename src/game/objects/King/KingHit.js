import { AssetsManager } from '../../assets';
import { KING_DEFAULT_ANIMATION_INTERVAL } from '../../config';
import { KingAnimated } from './KingAnimated';

class KingHit extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.hit, KING_DEFAULT_ANIMATION_INTERVAL, true);
  }

  /**
   * @param {import("../../shared/Frame").Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      if (this.king.hp <= 0) {
        return this.king.transitionState('dead').onUpdate(frame);
      }
      if (this.king.isOnGround) {
        return this.king.transitionState('idle').onUpdate(frame);
      }
      if (!this.king.isOnGround) {
        return this.king.transitionState('fall').onUpdate(frame);
      }
    }
    return super.update(frame);
  }
}

export { KingHit };
