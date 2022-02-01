const PIG_ANIMATION_INTERVAL = 10;
const PIG_DEFAULT_FACING = 'left';

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

  /**
   * @param {import('../../shared/Frame').Frame} _frame
   */
  // eslint-disable-next-line class-methods-use-this
  update(_frame) {}
}

export { PigStateAnimated, PIG_DEFAULT_FACING, PIG_ANIMATION_INTERVAL };
