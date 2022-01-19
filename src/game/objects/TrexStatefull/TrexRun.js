import { AssetsManager } from '../../assets';
import { TrexAnimated } from './TrexAnimated';

const SPRITE_ANIMATION_UPDATE = 10;

class TrexRun extends TrexAnimated {
  /**
   * @param {import('./TrexStatefull').TrexStatefull} trex
   */
  constructor(trex) {
    super(trex, [AssetsManager.trexRun1, AssetsManager.trexRun2], SPRITE_ANIMATION_UPDATE);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.trex.keyboard.pressed('ArrowUp')) {
      return this.trex.transitionState('jump').onUpdate(frame);
    }
    if (this.trex.keyboard.pressed('ArrowDown')) {
      return this.trex.transitionState('bend').onUpdate(frame);
    }
    return super.update(frame);
  }
}

export { TrexRun };
