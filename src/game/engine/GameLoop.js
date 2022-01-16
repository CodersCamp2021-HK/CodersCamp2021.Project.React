import { Frame } from '../shared';

/** @typedef {'created' | 'running' | 'stopped' | 'error'} GameLoopState */
/** @typedef {(frame: Frame) => void} OnFrame */
class GameLoop {
  #buffer;

  #display;

  /** @type {number | undefined} */
  #rafID;

  /** @type {number | undefined} */
  #prevTimestamp;

  /** @type {GameLoopState} */
  #state = 'created';

  #frameID = 0;

  #onFrame;

  /**
   * @param {import('./CanvasDisplay').CanvasDisplay} display
   * @param {import('./CanvasBuffer').CanvasBuffer} buffer
   * @param {OnFrame} fn
   */
  constructor(display, buffer, fn) {
    this.#display = display;
    this.#buffer = buffer;
    this.#onFrame = fn;
  }

  start() {
    if (this.#state === 'running') {
      return;
    }
    this.#state = 'running';
    this.#update(Date.now());
    this.#rafID = this.#raf();
  }

  stop() {
    if (this.#state === 'stopped') {
      return;
    }
    this.#state = 'stopped';
    if (this.#rafID) {
      cancelAnimationFrame(this.#rafID);
      this.#rafID = undefined;
    }
  }

  reset() {
    if (this.#state === 'created') {
      return;
    }
    this.stop();
    this.#state = 'created';
    this.#frameID = 0;
  }

  #update(/** @type {number} */ timestamp) {
    try {
      if (this.#prevTimestamp === undefined) {
        this.#prevTimestamp = timestamp;
      }

      const elapsed = timestamp - this.#prevTimestamp;
      this.#buffer.clear();
      const frame = new Frame(this.#frameID++, this.#buffer, elapsed);
      this.#onFrame(frame);
    } catch (e) {
      this.stop();
      this.#state = 'error';
      throw e;
    }
  }

  #raf() {
    return requestAnimationFrame(this.#loop.bind(this));
  }

  #loop(/** @type {number} */ timestamp) {
    if (this.#state !== 'running') {
      return;
    }

    if (this.#buffer) {
      this.#display.flush(this.#buffer);
    }
    this.#rafID = this.#raf();
    this.#update(timestamp);
  }

  get state() {
    return this.#state;
  }
}

export { GameLoop };
