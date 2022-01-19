import { AssetsManager } from '../assets';
import { BoxCollider, GameObject } from '../engine';
import { TILE_SIZE } from '../scenes/LevelScene/levelUtils';
import { Vector } from '../shared';

class Door extends GameObject {
  static #SPRITE = AssetsManager.door;

  /** @type {'start' | 'end'} */
  #type = 'start';

  /**
   * @param {Object} props
   * @param {'start' | 'end'} props.type
   * @param {Vector} props.position
   */
  onActivate({ type, position }) {
    this.#type = type;
    this.position = position.add(new Vector(TILE_SIZE / 2 - Door.#SPRITE.width / 2, TILE_SIZE - Door.#SPRITE.height));

    if (this.#type === 'end') {
      this.setCollider(BoxCollider, [new Vector(Door.#SPRITE.width, Door.#SPRITE.height)]);
    }
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    frame.buffer.draw(this.position, Door.#SPRITE);
  }
}

export { Door };
