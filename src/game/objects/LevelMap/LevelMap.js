import _ from 'lodash';
import { AssetsManager } from '../../assets';
import { GameObject } from '../../engine/GameObject';
import { Vector2D } from '../../shared';
import { patternsMatch, stringToCharMatrix } from './levelUtils';
import { tileRules } from './tileRules';

const TILE_SIZE = 32;

class LevelMap extends GameObject {
  #tileSprites = AssetsManager.tileset;

  #doorSprite = AssetsManager.door;

  /** @type {string[][]} */
  #tiles = [];

  /** @type {number} */
  #heightTiles = 0;

  /** @type {number} */
  #widthTiles = 0;

  /**
   * @param {number} x
   * @param {number} y
   * @returns {'X' | '.'} where 'X' - solid block, '.' - background
   */
  #getTileType(x, y) {
    if (x < 0 || x >= this.#widthTiles || y < 0 || y >= this.#heightTiles) {
      return 'X';
    }

    return this.#tiles[y][x] === 'X' ? 'X' : '.';
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {import('../../shared').Sprite}
   */
  #getTileSprite(x, y) {
    const neighbours = _.times(3, (row) => _.times(3, (col) => this.#getTileType(x + col - 1, y + row - 1)));
    const tileRule = tileRules.find((rule) => patternsMatch(neighbours, rule.pattern)) ?? tileRules[0];
    const texturePos = this.#getTileType(x, y) === 'X' ? tileRule.solidPos : tileRule.backgroundPos;

    return this.#tileSprites[texturePos.y][texturePos.x];
  }

  activate() {
    this.#tiles = stringToCharMatrix(/** @type {string} */ (this.getArg('map')));

    this.#heightTiles = this.#tiles.length;
    this.#widthTiles = Math.max(...this.#tiles.map((row) => row.length));
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    for (let y = 0; y < this.#heightTiles; y++) {
      for (let x = 0; x < this.#widthTiles; x++) {
        frame.buffer.draw(new Vector2D(x * TILE_SIZE, y * TILE_SIZE), this.#getTileSprite(x, y));
      }
    }

    frame.buffer.draw(new Vector2D(2.75 * TILE_SIZE, 5.25 * TILE_SIZE), this.#doorSprite);
    frame.buffer.draw(new Vector2D(10.75 * TILE_SIZE, 5.25 * TILE_SIZE), this.#doorSprite);
  }
}

export { LevelMap };
