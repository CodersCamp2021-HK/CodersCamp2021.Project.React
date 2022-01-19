import _ from 'lodash';
import { GameObject } from '../engine/GameObject';

class BackgroundTiles extends GameObject {
  /** @type {{position: import('../shared').Vector2D, sprite: import('../shared').Sprite}[]} */
  #tiles = [];

  activate() {
    this.#tiles = this.getArg('tiles') ?? [];
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    _.each(this.#tiles, (tile) => {
      frame.buffer.draw(tile.position, tile.sprite);
    });
  }
}

export { BackgroundTiles };
