class UIProxy {
  #levelWonCb;

  #levelLostCb;

  /**
   * @param {() => void} onLevelWon
   * @param {() => void} onLevelLost
   */
  constructor(onLevelWon, onLevelLost) {
    this.#levelWonCb = onLevelWon;
    this.#levelLostCb = onLevelLost;
  }

  levelWon() {
    this.#levelWonCb();
  }

  levelLost() {
    this.#levelLostCb();
  }
}

export { UIProxy };
