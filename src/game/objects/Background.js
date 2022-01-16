import { AssetsManager } from '../assets';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';

const TOTAL_WIDTH = 2402;
const SPEED = 6;

class Background extends GameObject {
  #sprite = AssetsManager.ground;

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    const bgPosition = new Vector2D(0, frame.buffer.height - this.#sprite.height - 10);
    const xOffset =
      this.#sprite.crop.origin.x + SPEED + this.#sprite.crop.width > TOTAL_WIDTH
        ? 2
        : this.#sprite.crop.origin.x + SPEED;
    this.#sprite = this.#sprite.setCrop(this.#sprite.crop.setOrigin(this.#sprite.crop.origin.setX(xOffset)));
    frame.buffer.draw(bgPosition, this.#sprite);
  }
}

export { Background };
