import _ from 'lodash';
import { GameObject } from '../engine';

/**
 * @typedef {{position: import('../shared').Vector, sprite: import('../shared').Sprite}[]} Tiles
 */
class BackgroundTiles extends GameObject {
  /** @type {Tiles} */
  #tiles = [];

  /**
   * @param {Object} props
   * @param {Tiles} props.tiles
   */
  onActivate({ tiles }) {
    this.#tiles = tiles;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    _.each(this.#tiles, (tile) => {
      frame.buffer.draw(tile.position, tile.sprite);
    });
  }
}

export { BackgroundTiles };
