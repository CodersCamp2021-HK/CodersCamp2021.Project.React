import { scenes } from '../scenes';
import { GameLoop } from './GameLoop';

/** @typedef {Readonly<{ keyboardInput:import('../proxy').KeyboardInput , ui:import('../proxy').UI}>} Proxy */

/** @typedef {keyof typeof import('../scenes').scenes} SceneName */

// TODO
/** @typedef {'created' | 'running' | 'stopped' } GameEngineState */
class GameEngine {
  #gameLoop;

  /** @type {import('./GameScene').GameScene | undefined} */
  #scene;

  /** @type {SceneName | undefined} */
  #currentSceneName;

  /**
   * @type {Proxy | undefined}
   */
  #proxy;

  /**
   * @param {import("../proxy").Display} display
   * @param {import("../proxy").DisplayBuffer} buffer
   * @param {import("../proxy").KeyboardInput} keyboardInput
   * @param {import("../proxy").UI} ui
   */
  constructor(display, buffer, keyboardInput, ui) {
    this.#gameLoop = new GameLoop((frame) => {
      this.#onFrame(frame);
    });
    this.#gameLoop.setDisplay(display, buffer);
    this.#proxy = { keyboardInput, ui };
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
      // @ts-ignore
      this.#scene = new scenes[this.#currentSceneName](this.#proxy);
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

export { GameEngine };
