import { UI } from '../../game/proxy';

class UIProxy extends UI {
  #setDistanceCb;

  /**
   * @param {(distance: number) => void} setDistanceCb
   */
  constructor(setDistanceCb) {
    super();
    this.#setDistanceCb = setDistanceCb;
  }

  setDistance(distance) {
    this.#setDistanceCb(distance);
  }
}

export { UIProxy };
