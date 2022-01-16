import { AssetsManager } from '../../assets';
import { TrexAnimated } from './TrexAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class TrexBend extends TrexAnimated {
  /**
   * @param {import('./TrexStatefull').TrexStatefull} trex
   */
  constructor(trex) {
    super(trex, [AssetsManager.trexBend1, AssetsManager.trexBend2], SPRITE_ANIMATION_UPDATE);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (!this.trex.keyboard.pressed('ArrowDown')) {
      return this.trex.transitionState('run').update(frame);
    }
    return super.update(frame);
  }
}

export { TrexBend };
