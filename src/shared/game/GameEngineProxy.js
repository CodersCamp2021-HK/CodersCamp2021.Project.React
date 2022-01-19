import { GameEngine } from '../../game/engine';

class GameEngineProxy {
  /**
   * @type {GameEngine | undefined}
   */
  #gameEngine;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('../ui').UIProxy} ui
   */
  initialize(canvas, ui) {
    this.#gameEngine = new GameEngine(canvas, ui);
    this.#gameEngine.load('level1');
    return this;
  }

  start() {
    this.#gameEngine?.start();
  }

  stop() {
    this.#gameEngine?.stop();
  }

  reset() {
    this.#gameEngine?.reset();
  }
}

export { GameEngineProxy };
