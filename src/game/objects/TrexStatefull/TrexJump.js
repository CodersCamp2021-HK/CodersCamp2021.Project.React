import { AssetsManager } from '../../assets';
import { Vector2D } from '../../shared';
import { TrexState } from './TrexState';

const JUMP_HIGHEST_POINT = -90;
const JUMP_SPEED = 4;
const JUMP_DELAY = 15;
const BACKGROUND_OFFSET = 10;
const MARGIN_LEFT = 10;

class TrexJump extends TrexState {
  /**
   * @param {import('./TrexStatefull').TrexStatefull} trex
   */
  constructor(trex) {
    super(trex);
    this.#sprite = AssetsManager.trexJump;
    /** @type {import('../../engine/BoxCollider').BoxCollider} */ (this.trex.collider).box = new Vector2D(
      this.#sprite.width,
      this.#sprite.height,
    );
  }

  #sprite;

  #jumpOffset = Vector2D.Zero;

  #jumpY = -JUMP_SPEED;

  #jumpDelay = JUMP_DELAY;

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    const baseSpritePosition = new Vector2D(MARGIN_LEFT, frame.buffer.height - this.#sprite.height - BACKGROUND_OFFSET);
    this.#jumpOffset = this.#jumpOffset.setY(this.#jumpOffset.y + this.#jumpY);
    if (this.#jumpOffset.y <= JUMP_HIGHEST_POINT) {
      this.#jumpY = 0;
      this.#jumpDelay -= 1;
    }
    if (this.#jumpOffset.y <= JUMP_HIGHEST_POINT && this.#jumpDelay === 0) {
      this.#jumpY = JUMP_SPEED;
      this.#jumpDelay = JUMP_DELAY;
    }

    if (this.#jumpOffset.equals(Vector2D.Zero)) {
      this.#jumpY = -JUMP_SPEED;
      this.trex.transitionState('run').update(frame);
      return;
    }
    this.position = baseSpritePosition.add(this.#jumpOffset);
    frame.buffer.draw(this.position, this.#sprite);
  }
}

export { TrexJump };
