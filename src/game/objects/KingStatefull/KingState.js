class KingState {
  #king;

  /**
   * @param {import('./KingStatefull').KingStatefull} king
   */
  constructor(king) {
    if (this.constructor === KingState) {
      throw new Error('Abstract class ctor.');
    }
    this.#king = king;
  }

  get king() {
    return this.#king;
  }

  get position() {
    return this.king.position;
  }

  set position(val) {
    this.king.position = val;
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  update(frame) {
    throw new Error('Abstract method.');
  }
}

export { KingState };
