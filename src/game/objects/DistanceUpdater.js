import { GameObject } from '../engine/GameObject';

class DistanceUpdater extends GameObject {
  #frameCount = 0;

  #distance = 0;

  update() {
    this.#frameCount += 1;
    if (this.#frameCount === 10) {
      this.ui.setDistance(this.#distance++);
      this.#frameCount = 0;
    }
  }
}

export { DistanceUpdater };
