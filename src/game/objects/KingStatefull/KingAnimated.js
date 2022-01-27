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
   * @param {import('../../shared/Frame').Frame} _frame
   */
  update(_frame) {
    const width = this.king.animation.sprite?.width ?? 0;
    const height = this.king.animation.sprite?.height ?? 0;
    this.king.transform.width = width;
    this.king.transform.height = height;
    this.king.setCollider(BoxCollider, [new Vector(width, height)]);
  }
}

export { KingAnimated };
