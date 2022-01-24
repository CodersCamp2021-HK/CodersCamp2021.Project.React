import { KingAnimated } from './KingAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class KingRunLeft extends KingAnimated {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   */
  constructor(king) {
    super(king, [], SPRITE_ANIMATION_UPDATE);
  }
}

export { KingRunLeft };
