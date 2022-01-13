import { GameEngine } from '../../game/engine';
import { CanvasBuffer } from './CanvasBuffer';
import { CanvasDisplay } from './CanvasDisplay';
import { WindowKeyboardInput } from './WindowKeyboardInput';

class GameEngineProxy {
  /**
   * @type {GameEngine | undefined}
   */
  #gameEngine;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('../../game/proxy').UI} ui
   */
  initialize(canvas, ui) {
    const display = new CanvasDisplay(canvas);
    const buffer = new CanvasBuffer(canvas);
    const keyboardInput = new WindowKeyboardInput();
    this.#gameEngine = new GameEngine(display, buffer, keyboardInput, ui);
    this.#gameEngine.load('main');
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
