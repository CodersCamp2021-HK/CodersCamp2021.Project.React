class UIProxy {
  #levelWonCb;

  #levelLostCb;

  #gameOverCb;

  /**
   * @param {() => void} onLevelWon
   * @param {() => void} onLevelLost
   * @param {() => void} onGameOver
   */
  constructor(onLevelWon, onLevelLost, onGameOver) {
    this.#levelWonCb = onLevelWon;
    this.#levelLostCb = onLevelLost;
    this.#gameOverCb = onGameOver;
  }

  levelWon() {
    this.#levelWonCb();
  }

  levelLost() {
    this.#levelLostCb();
  }

  gameOver() {
    this.#gameOverCb();
  }
}

export { UIProxy };
