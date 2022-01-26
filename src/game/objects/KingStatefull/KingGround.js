import { AssetsManager } from '../../assets';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingGround extends KingAnimated {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   */
  constructor(king) {
    super(king, [AssetsManager.kingGround], SPRITE_ANIMATION_UPDATE, true);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    return super.update(frame);
  }
}

export { KingGround };
