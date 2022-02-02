import { PIG_ANIMATION_INTERVAL } from '../../config';

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

export { PigStateAnimated };
