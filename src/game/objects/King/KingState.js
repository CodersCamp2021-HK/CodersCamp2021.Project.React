class KingState {
  #king;

  /**
   * @param {import('./King').King} king
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
   * @param {import('../../shared/Frame').Frame} _frame
   */
  // eslint-disable-next-line class-methods-use-this
  update(_frame) {
    throw new Error('Abstract method.');
  }
}

export { KingState };
