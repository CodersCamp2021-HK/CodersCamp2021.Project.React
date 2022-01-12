import { AssetsManager } from '../assets';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';

const TOTAL_WIDTH = 2402;

class Background extends GameObject {
  #ground = AssetsManager.ground;

  #updateGround() {
    const xOffset =
      this.#ground.crop.origin.x + 1 + this.#ground.width > TOTAL_WIDTH ? 2 : this.#ground.crop.origin.x + 1;
    this.#ground = this.#ground.setCrop(this.#ground.crop.setOrigin(this.#ground.crop.origin.setX(xOffset)));
  }

  update(/** @type {import('../shared/Frame').Frame} */ frame) {
    const bgPosition = new Vector2D(0, frame.buffer.height - this.#ground.height - 10);
    this.#updateGround();
    frame.buffer.draw(bgPosition, this.#ground);
  }
}

export { Background };
