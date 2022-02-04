import { GameEngine, scenes } from '../../game';

class GameEngineProxy {
  /**
   * @type {GameEngine<typeof scenes> | undefined}
   */
  #gameEngine;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('../ui').UIProxy} ui
   * @param {Number} level
   */



  initialize(canvas, ui, level) {
    this.#gameEngine = new GameEngine(canvas, ui, scenes);
    this.#gameEngine.load(`level${level}`);
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
