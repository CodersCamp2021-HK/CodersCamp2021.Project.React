import { KeyboardInput } from '../../game/proxy';

class WindowKeyboardInput extends KeyboardInput {
  /**
   * @type {Record<string, boolean>}
   */
  #keymap = {};

  constructor() {
    super();
    window.addEventListener('keydown', this.#onKeyDown.bind(this));
    window.addEventListener('keyup', this.#onKeyUp.bind(this));
  }

  /**
   * @param {import('../../game/proxy').KeyType} key
   * @returns {boolean}
   */
  pressed(key) {
    if (!(key in this.#keymap)) {
      this.#keymap[key] = false;
      return false;
    }
    return this.#keymap[key];
  }

  /**
   * @returns {import('../../game/proxy').KeyType[]}
   */
  allPressed() {
    // @ts-ignore
    return Object.entries(this.#keymap)
      .filter((x) => x[1])
      .map((x) => x[0]);
  }

  /**
   * @param {KeyboardEvent} e
   */
  #onKeyDown(e) {
    this.#keymap[e.key] = true;
  }

  /**
   * @param {KeyboardEvent} e
   */
  #onKeyUp(e) {
    this.#keymap[e.key] = false;
  }
}

export { WindowKeyboardInput };
