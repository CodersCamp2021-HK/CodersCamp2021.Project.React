/**
 * @typedef {{get width(): number; get height(): number; draw(position: import('./Vector').Vector, sprite: import('./Sprite').Sprite | import('./Shape').Shape): void}} Buffer
 */

class Frame {
  #frameID;

  #buffer;

  #elapsed;

  /**
   * @param {number} frameID
   * @param {Buffer} buffer
   * @param {number} elapsed
   */
  constructor(frameID, buffer, elapsed) {
    this.#frameID = frameID;
    this.#buffer = buffer;
    this.#elapsed = elapsed;
  }

  get ID() {
    return this.#frameID;
  }

  get buffer() {
    return this.#buffer;
  }

  get elapsed() {
    return this.#elapsed;
  }
}

export { Frame };
