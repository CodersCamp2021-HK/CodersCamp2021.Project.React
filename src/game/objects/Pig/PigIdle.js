import { PigState } from './PigState';

class PigIdle extends PigState {
  /**
   * @param {import('../../shared').Frame} _frame
   */
  // eslint-disable-next-line class-methods-use-this
  update(_frame) {}
}

export { PigIdle };
