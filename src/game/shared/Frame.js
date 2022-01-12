class Frame {
  #frameID;

  #buffer;

  #elapsed;

  /**
   * @param {number} frameID
   * @param {import('../proxy').DisplayBuffer} buffer
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
