import { GameObject } from '../engine/GameObject';
/**
 * @extends {GameObject<{ UI: import('../proxy').UI}>}
 */
class DistanceUpdater extends GameObject {
  #frameCount = 0;

  #distance = 0;

  update() {
    this.#frameCount += 1;
    if (this.#frameCount === 10) {
      this.getArg('UI')?.setDistance(this.#distance++);
      this.#frameCount = 0;
    }
  }
}

export { DistanceUpdater };
