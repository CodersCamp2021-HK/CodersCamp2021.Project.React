import { AssetsManager } from '../../assets';
import { Vector } from '../../shared/Vector';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 3;

class KingRunRight extends KingAnimated {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   */
  constructor(king) {
    super(
      king,
      [
        AssetsManager.kingRun01,
        AssetsManager.kingRun02,
        AssetsManager.kingRun03,
        AssetsManager.kingRun04,
        AssetsManager.kingRun05,
        AssetsManager.kingRun06,
        AssetsManager.kingRun07,
        AssetsManager.kingRun08,
      ],
      SPRITE_ANIMATION_UPDATE,
    );
    king.rigidbody.addVelocity(new Vector(2, 0));
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  update(frame) {
    if (this.king.keyboard.pressed('ArrowUp')) {
      return this.king.transitionState('jump').onUpdate(frame);
    }
    if (!this.king.keyboard.pressed('ArrowRight')) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('x')) {
      return this.king.transitionState('attack').onUpdate(frame);
    }
    return super.update(frame);
  }
}

export { KingRunRight };
