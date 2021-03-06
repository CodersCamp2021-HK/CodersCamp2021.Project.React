import { AssetsManager } from '../../assets';
import { KingSwing } from './KingSwing';
import { KingAnimated } from './KingAnimated';
import { KING_ATTACK_ANIMATION_INTERVAL } from '../../config';

class KingAttack extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.attack, KING_ATTACK_ANIMATION_INTERVAL, true);

    this.king.create(KingSwing, {
      args: {
        attackCenter: this.king.transform.origin,
      },
    });
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
