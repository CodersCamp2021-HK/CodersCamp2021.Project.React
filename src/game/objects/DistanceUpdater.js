import { GameObject } from '../engine/GameObject';
/**
 * @extends {GameObject<{ UI: import('../proxy').UI}>}
 */
class DistanceUpdater extends GameObject {
  #distance = 0;

  update() {
    this.getArg('UI')?.setDistance(this.#distance++);
  }
}

export { DistanceUpdater };
