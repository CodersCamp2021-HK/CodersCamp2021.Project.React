import { AssetsManager } from '../assets';
import { Vector } from '../shared';
import { GameObject, BoxCollider } from '../engine';

/**
 * @typedef {import('../shared').Sprite} TrexSprite
 */

/**
 * @typedef {'run' | 'jump' | 'bend' | 'colision'} TrexState
 */

const JUMP_HIGHEST_POINT = -90;
const JUMP_SPEED = 4;
const JUMP_DELAY = 15;
const SPRITE_ANIMATION_UPDATE = 10;
const BACKGROUND_OFFSET = 10;
const MARGIN_LEFT = 10;

class Trex extends GameObject {
  #frameCount = 0;

  #sprite = AssetsManager.trexRun1;

  #jumpOffset = Vector.Zero;

  #jumpY = -JUMP_SPEED;

  #jumpDelay = JUMP_DELAY;

  /**
   * @type {TrexState}
   */
  #state = 'run';

  onActivate() {
    this.setCollider(BoxCollider, [new Vector(this.#sprite.width, this.#sprite.height)]);
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    if (this.keyboard.pressed('ArrowUp') || this.#state === 'jump') {
      const baseSpritePosition = new Vector(MARGIN_LEFT, frame.buffer.height - this.#sprite.height - BACKGROUND_OFFSET);
      this.#stateTransition('jump', AssetsManager.trexJump);
      this.#animateJump();
      this.position = baseSpritePosition.add(this.#jumpOffset);
    } else {
      if (this.keyboard.pressed('ArrowDown')) {
        this.#stateTransition('bend', AssetsManager.trexBend1);
        this.#updateSprite(() => this.#toggleSprite(AssetsManager.trexBend1, AssetsManager.trexBend2));
      } else {
        this.#stateTransition('run', AssetsManager.trexRun1);
        this.#updateSprite(() => this.#toggleSprite(AssetsManager.trexRun1, AssetsManager.trexRun2));
      }
      this.position = new Vector(MARGIN_LEFT, frame.buffer.height - this.#sprite.height - BACKGROUND_OFFSET);
    }
    frame.buffer.draw(this.position, this.#sprite);
  }

  onCollision() {
    this.ui.setLose();
  }

  #animateJump() {
    this.#jumpOffset = this.#jumpOffset.setY(this.#jumpOffset.y + this.#jumpY);
    if (this.#jumpOffset.y <= JUMP_HIGHEST_POINT) {
      this.#jumpY = 0;
      this.#jumpDelay -= 1;
    }
    if (this.#jumpOffset.y <= JUMP_HIGHEST_POINT && this.#jumpDelay === 0) {
      this.#jumpY = JUMP_SPEED;
      this.#jumpDelay = JUMP_DELAY;
    }

    if (this.#jumpOffset.equals(Vector.Zero)) {
      this.#jumpY = -JUMP_SPEED;
      this.#state = 'run';
    }
  }

  /**
   * @param {TrexState} state
   * @param {TrexSprite} sprite
   */
  #stateTransition(state, sprite) {
    if (this.#state !== state) {
      this.#state = state;
      this.#frameCount = 0;
      this.#sprite = sprite;
      this.#updateCollider();
    }
  }

  /**
   * @param {() => TrexSprite} fn
   */
  #updateSprite(fn) {
    this.#frameCount += 1;
    if (this.#frameCount === SPRITE_ANIMATION_UPDATE) {
      this.#sprite = fn();
      this.#frameCount = 0;
    }
  }

  #updateCollider() {
    /** @type {BoxCollider} */ (this.collider).box = new Vector(this.#sprite.width, this.#sprite.height);
  }

  /**
   *
   * @param {TrexSprite} s1
   * @param {TrexSprite} s2
   * @returns {TrexSprite}
   */
  #toggleSprite(s1, s2) {
    return this.#sprite === s1 ? s2 : s1;
  }
}

export { Trex };
