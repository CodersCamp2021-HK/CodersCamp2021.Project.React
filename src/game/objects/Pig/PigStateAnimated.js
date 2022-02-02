import { PIG_ANIMATION_INTERVAL, PIG_DEFAULT_ASSET_FACING } from '../../config';

/**
 * @abstract
 */
class PigStateAnimated {
  #pig;

  /**
   * @param {import('./Pig').Pig} pig
   * @param {import('../../shared/Sprite').Sprite[]} sprites
   * @param {boolean} doOnce
   */
  constructor(pig, sprites, doOnce = false) {
    if (this.constructor === PigStateAnimated) {
      throw new Error('Abstract class constructor.');
    }

    this.#pig = pig;

    pig.animation.reset(PIG_ANIMATION_INTERVAL, sprites, doOnce);
  }

  get pig() {
    return this.#pig;
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}
}

export { PigStateAnimated, PIG_DEFAULT_ASSET_FACING as PIG_DEFAULT_FACING, PIG_ANIMATION_INTERVAL };
