import { AssetsManager } from '../../assets';
import { KING_DEFAULT_ANIMATION_INTERVAL } from '../../config';
import { KingAnimated } from './KingAnimated';

class KingDoorOut extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.doorOut, KING_DEFAULT_ANIMATION_INTERVAL, true);
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
