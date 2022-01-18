import { AssetsManager } from '../assets';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';

const TILE_SIZE = 32;

class Terrain extends GameObject {
  #sprites = AssetsManager.terrain;

  #doorSprite = AssetsManager.door;

  /** @type {string[]} */
  #map = [];

  /** @type {number} */
  #height = 0;

  /** @type {number} */
  #width = 0;

  activate() {
    this.#map = /** @type {string} */ (this.getArg('map'))
      .trim()
      .split('\n')
      .map((line) => line.trim());

    this.#height = this.#map.length;
    this.#width = Math.max(...this.#map.map((row) => row.length));
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    for (let y = 0; y < this.#height; y++) {
      for (let x = 0; x < this.#width; x++) {
        frame.buffer.draw(
          new Vector2D(x * TILE_SIZE, y * TILE_SIZE),
          this.#map[y][x] === 'X' ? this.#sprites[0][0] : this.#sprites[0][4],
        );
      }
    }
  }
}

export { Terrain };
