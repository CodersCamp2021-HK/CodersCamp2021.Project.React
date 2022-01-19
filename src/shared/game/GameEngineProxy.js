import { GameEngine, scenes } from '../../game';

class GameEngineProxy {
  /**
   * @type {GameEngine<typeof scenes> | undefined}
   */
  #gameEngine;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('../ui').UIProxy} ui
   */
  initialize(canvas, ui) {
    this.#gameEngine = new GameEngine(canvas, ui, scenes);
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
