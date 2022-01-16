/** @typedef {'Cancel' | 'Help' | 'Backspace' | 'Tab' | 'Clear' | 'Enter' | 'Enter' | 'Shift' | 'Control' | 'Alt' | 'Pause' | 'CapsLock' | 'Escape' | ' ' | 'PageUp' | 'PageDown' | 'End' | 'Home' | 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'PrintScreen' | 'Insert' | 'Delete' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'Meta' | 'Meta' | 'Meta' | 'ContextMenu' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '*' | '+' | '-' | '.' | '/' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'F13' | 'F14' | 'F15' | 'F16' | 'F17' | 'F18' | 'F19' | 'F20' | 'F21' | 'F22' | 'F23' | 'F24' | 'NumLock' | 'ScrollLock' | ';' | '=' | ',' | '-' | '.' | '/' | '`' | '[' | '\\' | ']' | "'"} KeyType */

class WindowKeyboardInput {
  /**
   * @type {Record<string, boolean>}
   */
  #keymap = {};

  constructor() {
    window.addEventListener('keydown', this.#onKeyDown.bind(this));
    window.addEventListener('keyup', this.#onKeyUp.bind(this));
  }

  /**
   * @param {KeyType} key
   */
  pressed(key) {
    if (!(key in this.#keymap)) {
      this.#keymap[key] = false;
      return false;
    }
    return this.#keymap[key];
  }

  /**
   * @returns {KeyType[]}
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
