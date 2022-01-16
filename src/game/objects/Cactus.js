import _ from 'lodash';
import { GameObject } from '../engine/GameObject';
import { AssetsManager } from '../assets';
import { Vector2D } from '../shared';
import { BoxCollider } from '../engine/BoxCollider';

/**
 * @typedef {import('../shared').Sprite} CactusSprite
 */

const SPEED = 3;
const BACKGROUND_OFFSET = 10;

function randomizeCactusSprite() {
  return /** @type {CactusSprite} */ (
    _.random() === 1 ? _.sample(AssetsManager.cactusSmall) : _.sample(AssetsManager.cactusLarge)
  );
}

/**
 * @extends {GameObject<{ offset: Vector2D  }>}
 */
class Cactus extends GameObject {
  #sprite = randomizeCactusSprite();

  #offset = Vector2D.Zero;

  activate() {
    this.#offset = this.getArg('offset');
    this.setCollider(BoxCollider, [new Vector2D(this.#sprite.width, this.#sprite.height)]);
  }

  get width() {
    return this.#sprite.width;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    const basePosition = new Vector2D(
      frame.buffer.width + this.#sprite.width,
      frame.buffer.height - this.#sprite.height - BACKGROUND_OFFSET,
    );
    this.#offset = this.#offset.setX(this.#offset.x - SPEED);
    this.position = basePosition.add(this.#offset);
    frame.buffer.draw(this.position, this.#sprite);
  }
}

export { Cactus };
