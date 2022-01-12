import { AssetsManager } from '../assets';
import { Vector2D } from '../shared';
import { GameObject } from '../engine/GameObject';

class Trex extends GameObject {
  #frameCount = 0;

  #trex = AssetsManager.trex1;

  #updateTrexSprite() {
    this.#frameCount += 1;
    if (this.#frameCount === 15) {
      this.#trex = this.#trex === AssetsManager.trex1 ? AssetsManager.trex2 : AssetsManager.trex1;
      this.#frameCount = 0;
    }
  }

  update(/** @type {import('../shared/Frame').Frame} */ frame) {
    const trexPosition = new Vector2D(0, frame.buffer.height - AssetsManager.trex0.height - 10);
    this.#updateTrexSprite();
    frame.buffer.draw(trexPosition, this.#trex);
  }
}

export { Trex };
