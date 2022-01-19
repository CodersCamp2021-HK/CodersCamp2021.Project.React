import { AssetsManager } from '../assets';
import { BoxCollider } from '../engine/BoxCollider';
import { GameObject } from '../engine/GameObject';
import { TILE_SIZE } from '../scenes/LevelScene/levelUtils';
import { Vector2D } from '../shared';

class Door extends GameObject {
  static #SPRITE = AssetsManager.door;

  /** @type {'start' | 'end'} */
  #type = 'start';

  activate() {
    this.#type = this.getArg('type') ?? 'start';
    this.position = /** @type {Vector2D} */ (this.getArg('position') ?? Vector2D.Zero).add(
      new Vector2D(TILE_SIZE / 2 - Door.#SPRITE.width / 2, TILE_SIZE - Door.#SPRITE.height),
    );

    if (this.#type === 'end') {
      this.setCollider(BoxCollider, [new Vector2D(Door.#SPRITE.width, Door.#SPRITE.height)]);
    }
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    frame.buffer.draw(this.position, Door.#SPRITE);
  }
}

export { Door };
