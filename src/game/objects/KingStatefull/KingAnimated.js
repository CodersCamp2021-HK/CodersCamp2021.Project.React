import { BoxCollider } from '../../engine';
import { Vector } from '../../shared';
import { KingState } from './KingState';

class KingAnimated extends KingState {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   * @param {import('../../shared/Sprite').Sprite[]} sprites
   * @param {number} updateAfter
   * @param {boolean} doOnce
   */
  constructor(king, sprites, updateAfter, doOnce = false) {
    super(king);
    if (this.constructor === KingAnimated) {
      throw new Error('Abstract class ctor.');
    }
    if (sprites.length <= 0) {
      throw new Error('Sprites length should be greater than 0.');
    }
    king.animation.reset(updateAfter, sprites, doOnce);
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  update(frame) {
    // eslint-disable-next-line no-param-reassign
    this.king.transform.width = this.king.animation.sprite.width;
    // eslint-disable-next-line no-param-reassign
    this.king.transform.height = this.king.animation.sprite.height;
    this.king.setCollider(BoxCollider, [
      // @ts-ignore
      new Vector(this.king.animation.sprite.width, this.king.animation.sprite.height),
    ]);
  }
}

export { KingAnimated };
