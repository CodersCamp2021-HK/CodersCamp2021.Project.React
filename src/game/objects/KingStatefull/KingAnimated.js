import { AssetsManager } from '../../assets';
import { Vector } from '../../shared';
import { KingState } from './KingState';

const BACKGROUND_OFFSET = 10;
const MARGIN_LEFT = 10;

class KingAnimated extends KingState {
  /**
   * @param {import('./KingStatefull').KingStatefull} king
   * @param {import('../../shared/Sprite').Sprite[]} sprites
   * @param {number} updateAfter
   */
  constructor(king, sprites, updateAfter) {
    super(king);
    if (this.constructor === KingAnimated) {
      throw new Error('Abstract class ctor.');
    }
    if (sprites.length <= 0) {
      throw new Error('Sprites length should be greater than 0.');
    }
    this.#sprites = sprites;
    this.#updateAfter = updateAfter;
    this.#spriteNum = 0;
    this.#sprite = AssetsManager.kingIdle01;
    this.#updateSprite();
  }

  #updateAfter;

  #frameCount = 0;

  #sprites;

  #spriteNum;

  /**
   * @type {import('../../shared/Sprite').Sprite}
   */
  #sprite;

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  update(frame) {
    this.position = new Vector(MARGIN_LEFT, frame.buffer.height - this.#sprite.height - BACKGROUND_OFFSET);
    this.#frameCount += 1;
    if (this.#frameCount === this.#updateAfter) {
      this.#updateSprite();
      this.#frameCount = 0;
    }
    frame.buffer.draw(this.position, this.#sprite);
  }

  #updateSprite() {
    this.#sprite = this.#sprites[this.#spriteNum];
    this.#spriteNum = (this.#spriteNum + 1) % this.#sprites.length;
    /** @type {import('../../engine').BoxCollider} */ (this.king.collider).box = new Vector(
      this.#sprite.width,
      this.#sprite.height,
    );
  }
}

export { KingAnimated };
