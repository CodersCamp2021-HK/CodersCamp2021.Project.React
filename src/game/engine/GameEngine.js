import { scenes } from '../scenes';
import { GameLoop } from './GameLoop';

/** @typedef {keyof typeof import('../scenes').scenes} SceneName */

// TODO
/** @typedef {'created' | 'running' | 'stopped' } GameEngineState */
class GameEngineSingleton {
  #gameLoop;

  /** @type {import('./GameScene').GameScene | undefined} */
  #scene;

  /** @type {SceneName | undefined} */
  #currentSceneName;

  /** @type {import('../proxy/KeyboardInput').KeyboardInput | undefined} */
  #keyboardInput;

  constructor() {
    this.#gameLoop = new GameLoop((frame) => {
      this.#onFrame(frame);
    });
  }

  /**
   * @param {import("../proxy/Display").Display} display
   * @param {import("../proxy/DisplayBuffer").DisplayBuffer} buffer
   * @param {import("../proxy/KeyboardInput").KeyboardInput} keyboardInput
   */
  initialize(display, buffer, keyboardInput) {
    this.#gameLoop.setDisplay(display, buffer);
    this.#keyboardInput = keyboardInput;
  }

  /**
   * @param {SceneName} sceneName
   */
  load(sceneName) {
    this.#currentSceneName = sceneName;
    this.reset();
    return this;
  }

  start() {
    if (!this.#scene) {
      throw new Error('Scene not loaded');
    }
    this.#gameLoop.start();
    return this;
  }

  stop() {
    this.#gameLoop.stop();
    return this;
  }

  reset() {
    this.#gameLoop.reset();
    if (this.#currentSceneName) {
      this.#scene?.destroy();
      this.#scene = new scenes[this.#currentSceneName]();
      this.#scene.activate();
    }
    return this;
  }

  /**
   * @param {import('../shared/Frame').Frame} frame
   */
  #onFrame(frame) {
    this.#scene?.update(frame);
  }
}

const GameEngine = new GameEngineSingleton();

export { GameEngine };
