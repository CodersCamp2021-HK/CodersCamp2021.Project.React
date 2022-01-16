class UIProxy {
  #setDistanceCb;

  #setLoseCb;

  /**
   * @param {(distance: number) => void} setDistanceCb
   * @param {() => void} setLoseCb
   */
  constructor(setDistanceCb, setLoseCb) {
    this.#setDistanceCb = setDistanceCb;
    this.#setLoseCb = setLoseCb;
  }

  /**
   * @param {number} distance
   */
  setDistance(distance) {
    this.#setDistanceCb(distance);
  }

  setLose() {
    this.#setLoseCb();
  }
}

export { UIProxy };
