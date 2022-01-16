class TrexState {
  #trex;

  /**
   * @param {import('./TrexStatefull').TrexStatefull} trex
   */
  constructor(trex) {
    if (this.constructor === TrexState) {
      throw new Error('Abstract class ctor.');
    }
    this.#trex = trex;
  }

  get trex() {
    return this.#trex;
  }

  get position() {
    return this.trex.position;
  }

  set position(val) {
    this.trex.position = val;
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  update(frame) {
    throw new Error('Abstract method.');
  }
}

export { TrexState };
