import _ from 'lodash';
import { GameObject, BoxCollider } from '../engine';
import { AssetsManager } from '../assets';
import { Vector } from '../shared';

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

class Cactus extends GameObject {
  #sprite = randomizeCactusSprite();

  #offset = Vector.Zero;

  /**
   * @param {{ offset: Vector  }} props
   */
  onActivate({ offset }) {
    this.#offset = offset;
    this.setCollider(BoxCollider, [new Vector(this.#sprite.width, this.#sprite.height)]);
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    const basePosition = new Vector(
      frame.buffer.width + this.#sprite.width,
      frame.buffer.height - this.#sprite.height - BACKGROUND_OFFSET,
    );
    this.#offset = this.#offset.setX(this.#offset.x - SPEED);
    this.position = basePosition.add(this.#offset);
    frame.buffer.draw(this.position, this.#sprite);
  }

  get width() {
    return this.#sprite.width;
  }
}

export { Cactus };
