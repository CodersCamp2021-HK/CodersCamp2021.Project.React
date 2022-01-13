/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/** @typedef {'Cancel' | 'Help' | 'Backspace' | 'Tab' | 'Clear' | 'Enter' | 'Enter' | 'Shift' | 'Control' | 'Alt' | 'Pause' | 'CapsLock' | 'Escape' | ' ' | 'PageUp' | 'PageDown' | 'End' | 'Home' | 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'PrintScreen' | 'Insert' | 'Delete' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'Meta' | 'Meta' | 'Meta' | 'ContextMenu' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '*' | '+' | '-' | '.' | '/' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'F13' | 'F14' | 'F15' | 'F16' | 'F17' | 'F18' | 'F19' | 'F20' | 'F21' | 'F22' | 'F23' | 'F24' | 'NumLock' | 'ScrollLock' | ';' | '=' | ',' | '-' | '.' | '/' | '`' | '[' | '\\' | ']' | "'"} KeyType */

class KeyboardInput {
  constructor() {
    if (this.constructor === KeyboardInput) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * @param {KeyType} key
   * @returns {boolean}
   */
  pressed(key) {
    throw new Error('Abstract method');
  }

  /**
   * @returns {KeyType[]}
   */
  allPressed() {
    throw new Error('Abstract method');
  }
}

export { KeyboardInput };
