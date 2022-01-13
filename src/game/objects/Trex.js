import { AssetsManager } from '../assets';
import { Vector2D } from '../shared';
import { GameObject } from '../engine/GameObject';

const JUMP_HIGHEST_POINT = -100;
const JUMP_SPEED = 4;

/**
 * @typedef {import('../shared').Sprite} Sprite
 */

/**
 * @typedef {'run' | 'jump' | 'bend' | 'colision'} TrexState
 */

/**
 * @extends {GameObject<{ keyboard: import('../proxy').KeyboardInput}>}
 */
class Trex extends GameObject {
  #frameCount = 0;

  #sprite = AssetsManager.trexRun1;

  #jumpOffset = Vector2D.Zero;

  #jumpY = -JUMP_SPEED;

  /**
   * @type {TrexState}
   */
  #state = 'run';

  update(/** @type {import('../shared/Frame').Frame} */ frame) {
    const keyboard = this.getArg('keyboard');
    if (keyboard.pressed('ArrowUp') || this.#state === 'jump') {
      this.#stateTransition('jump', AssetsManager.trexJump);
      this.#animateJump(frame);
      return;
    }

    if (keyboard.pressed('ArrowDown')) {
      this.#stateTransition('bend', AssetsManager.trexBend1);
      this.#updateSprite(() => this.#toggleSprite(AssetsManager.trexBend1, AssetsManager.trexBend2));
    } else {
      this.#stateTransition('run', AssetsManager.trexRun1);
      this.#updateSprite(() => this.#toggleSprite(AssetsManager.trexRun1, AssetsManager.trexRun2));
    }
    const spritePosition = new Vector2D(10, frame.buffer.height - this.#sprite.height - 10);
    frame.buffer.draw(spritePosition, this.#sprite);
  }

  #animateJump(/** @type {import('../shared/Frame').Frame} */ frame) {
    const baseSpritePosition = new Vector2D(10, frame.buffer.height - this.#sprite.height - 10);
    this.#jumpOffset = this.#jumpOffset.setY(this.#jumpOffset.y + this.#jumpY);
    if (this.#jumpOffset.y === JUMP_HIGHEST_POINT) {
      this.#jumpY = JUMP_SPEED;
    }
    if (this.#jumpOffset.equals(Vector2D.Zero)) {
      this.#jumpY = -JUMP_SPEED;
      this.#state = 'run';
    }
    const spritePosition = baseSpritePosition.add(this.#jumpOffset);
    frame.buffer.draw(spritePosition, this.#sprite);
  }

  /**
   * @param {TrexState} state
   * @param {Sprite} sprite
   */
  #stateTransition(state, sprite) {
    if (this.#state !== state) {
      this.#state = state;
      this.#frameCount = 0;
      this.#sprite = sprite;
    }
  }

  /**
   * @param {() => Sprite} fn
   */
  #updateSprite(fn) {
    this.#frameCount += 1;
    if (this.#frameCount === 10) {
      this.#sprite = fn();
      this.#frameCount = 0;
    }
  }

  /**
   *
   * @param {Sprite} s1
   * @param {Sprite} s2
   * @returns {Sprite}
   */
  #toggleSprite(s1, s2) {
    return this.#sprite === s1 ? s2 : s1;
  }
}

export { Trex };
