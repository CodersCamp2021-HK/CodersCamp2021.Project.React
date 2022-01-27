import { AssetsManager } from '../../assets';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingDoorOut extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(
      king,
      [
        AssetsManager.kingDoorOut01,
        AssetsManager.kingDoorOut02,
        AssetsManager.kingDoorOut03,
        AssetsManager.kingDoorOut04,
        AssetsManager.kingDoorOut05,
        AssetsManager.kingDoorOut06,
        AssetsManager.kingDoorOut07,
        AssetsManager.kingDoorOut08,
      ],
      SPRITE_ANIMATION_UPDATE,
      true,
    );
  }

  /**
   * @param {import("../../shared/Frame").Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    return super.update(frame);
  }
}

export { KingDoorOut };
