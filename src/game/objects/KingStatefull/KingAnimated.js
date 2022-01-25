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
    // eslint-disable-next-line no-param-reassign
    king.transform.width = king.animation.sprite.width;
    // eslint-disable-next-line no-param-reassign
    king.transform.height = king.animation.sprite.height;
    // @ts-ignore
    king.setCollider(BoxCollider, [new Vector(king.animation.sprite.width, king.animation.sprite.height)]);
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  update(frame) {}
}

export { KingAnimated };
