import { AssetsManager } from '../../assets';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingDoorIn extends KingAnimated {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   */
  constructor(king) {
    super(
      king,
      [
        AssetsManager.kingDoorIn01,
        AssetsManager.kingDoorIn02,
        AssetsManager.kingDoorIn03,
        AssetsManager.kingDoorIn04,
        AssetsManager.kingDoorIn05,
        AssetsManager.kingDoorIn06,
        AssetsManager.kingDoorIn07,
        AssetsManager.kingDoorIn08,
      ],
      SPRITE_ANIMATION_UPDATE,
      true,
    );
  }

  /**
   * @param {import("../../shared/Frame").Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished && !this.king.keyboard.pressed('ArrowDown')) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    return super.update(frame);
  }
}

export { KingDoorIn };
