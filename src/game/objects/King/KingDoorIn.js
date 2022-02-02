import { AssetsManager } from '../../assets';
import { KING_DEFAULT_ANIMATION_INTERVAL } from '../../config';
import { Vector } from '../../shared';
import { KingAnimated } from './KingAnimated';

class KingDoorIn extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.doorIn, KING_DEFAULT_ANIMATION_INTERVAL, true);
    this.king.rigidbody.velocity = Vector.Zero;
  }

  /**
   * @param {import("../../shared/Frame").Frame} _frame
   */
  update(_frame) {
    if (this.king.animation.isFinished) {
      this.king.ui.levelFinished();
    }
  }
}

export { KingDoorIn };
