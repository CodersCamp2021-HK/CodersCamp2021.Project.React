import { AssetsManager } from '../../assets';
import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingIdle extends KingAnimated {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   */
  constructor(king) {
    super(
      king,
      [
        AssetsManager.kingIdle01,
        AssetsManager.kingIdle02,
        AssetsManager.kingIdle03,
        AssetsManager.kingIdle04,
        AssetsManager.kingIdle05,
        AssetsManager.kingIdle06,
        AssetsManager.kingIdle07,
        AssetsManager.kingIdle08,
        AssetsManager.kingIdle09,
        AssetsManager.kingIdle10,
        AssetsManager.kingIdle11,
      ],
      SPRITE_ANIMATION_UPDATE,
    );
  }
}

export { KingIdle };
