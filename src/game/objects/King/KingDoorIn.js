import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingDoorIn extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.doorIn, SPRITE_ANIMATION_UPDATE, true);
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
