class UIProxy {
  #setLoseCb;

  /**

   * @param {() => void} setLoseCb
   */
  constructor(setLoseCb) {
    this.#setLoseCb = setLoseCb;
  }

  setLose() {
    this.#setLoseCb();
  }
}

export { UIProxy };
