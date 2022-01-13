import _ from 'lodash';
import { AssetsManager } from '../assets';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';

const SPEED = 4;

class Bird extends GameObject {
  #frameCount = 0;

  #sprite = AssetsManager.bird1;

  #offset = new Vector2D(0, _.random(-15, 15));

  update(/** @type {import('../shared/Frame').Frame} */ frame) {
    const position = new Vector2D(
      frame.buffer.width + this.#sprite.width,
      frame.buffer.height - this.#sprite.height - 50,
    );
    this.#offset = this.#offset.setX(this.#offset.x - SPEED);
    this.#updateSprite();

    if (this.#offset.x < -(frame.buffer.width + 2 * this.#sprite.width)) {
      this.destroy(this);
    }
    frame.buffer.draw(position.add(this.#offset), this.#sprite);
  }

  #updateSprite() {
    this.#frameCount += 1;
    if (this.#frameCount === 15) {
      this.#sprite = this.#sprite === AssetsManager.bird1 ? AssetsManager.bird2 : AssetsManager.bird1;
      this.#frameCount = 0;
    }
  }
}

export { Bird };
