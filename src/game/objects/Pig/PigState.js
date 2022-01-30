/**
 * @abstract
 */
class PigState {
  #pig;

  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    if (this.constructor === PigState) {
      throw new Error('Abstract class constructor.');
    }

    this.#pig = pig;
  }

  get pig() {
    return this.#pig;
  }

  /**
   * @param {import('../../shared/Frame').Frame} _frame
   */
  // eslint-disable-next-line class-methods-use-this
  update(_frame) {}
}

export { PigState };
