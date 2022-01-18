import { CanvasBuffer } from './internals/CanvasBuffer';
import { CanvasDisplay } from './internals/CanvasDisplay';
import { GameLoop } from './internals/GameLoop';
import { GameSceneManager } from './internals/GameSceneManager';
import { WindowKeyboardInput } from './internals/WindowKeyboardInput';

/** @typedef {Readonly<{ keyboard: WindowKeyboardInput , ui:import('../../shared').UIProxy}>} Services */

/**
 * @template {Record<string, typeof import('./GameScene').GameScene>} TScenes
 */
class GameEngine {
  /** @typedef {keyof TScenes} SceneName */

  /** @type {SceneName | undefined} */
  #currentSceneName;

  #gameLoop;

  #sceneManager;

  #scenes;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('../../shared').UIProxy} ui
   * @param {TScenes} scenes
   */
  constructor(canvas, ui, scenes) {
    const display = new CanvasDisplay(canvas);
    const buffer = new CanvasBuffer(canvas);
    const keyboard = new WindowKeyboardInput();
    this.#scenes = scenes;
    this.#sceneManager = new GameSceneManager({ keyboard, ui });
    this.#gameLoop = new GameLoop(display, buffer, (frame) => {
      this.#onFrame(frame);
    });
  }

  get scene() {
    return this.#currentSceneName;
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
    if (!this.#currentSceneName) {
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
      this.#sceneManager.load(this.#scenes[this.#currentSceneName]);
    }
    return this;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  #onFrame(frame) {
    this.#sceneManager.update(frame);
  }
}

export { GameEngine };
