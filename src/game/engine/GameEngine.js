import { scenes } from '../scenes';
import { CanvasBuffer } from './CanvasBuffer';
import { CanvasDisplay } from './CanvasDisplay';
import { GameLoop } from './GameLoop';
import { WindowKeyboardInput } from './WindowKeyboardInput';

/** @typedef {Readonly<{ keyboard: WindowKeyboardInput , ui:import('../../shared').UIProxy}>} Services */

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
   * @type {Services}
   */
  #services;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('../../shared').UIProxy} ui
   */
  constructor(canvas, ui) {
    const display = new CanvasDisplay(canvas);
    const buffer = new CanvasBuffer(canvas);
    const keyboard = new WindowKeyboardInput();
    this.#gameLoop = new GameLoop(display, buffer, (frame) => {
      this.#onFrame(frame);
    });
    this.#services = { keyboard, ui };
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
      this.#scene = new scenes[this.#currentSceneName](this.#services);
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
