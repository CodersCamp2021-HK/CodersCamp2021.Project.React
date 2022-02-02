class UIProxy {
  #levelFinishedCb;

  /**

   * @param {() => void} onLevelFinished
   */
  constructor(onLevelFinished) {
    this.#levelFinishedCb = onLevelFinished;
  }

  levelFinished() {
    this.#levelFinishedCb();
  }
}

export { UIProxy };
