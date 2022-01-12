import { GameEngine } from '../../game/engine';
import { KeyboardInput } from '../../game/proxy';
import { CanvasBuffer } from './CanvasBuffer';
import { CanvasDisplay } from './CanvasDisplay';

class GameEngineProxy {
  #gameEngine = GameEngine;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  initialize(canvas) {
    const display = new CanvasDisplay(canvas);
    const buffer = new CanvasBuffer(canvas);
    const keyboardInput = new KeyboardInput();
    this.#gameEngine.initialize(display, buffer, keyboardInput);
    this.#gameEngine.load('main');
    return this;
  }

  start() {
    this.#gameEngine.start();
  }
}

export { GameEngineProxy };
