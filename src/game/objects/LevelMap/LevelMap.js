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

  /** @type {Vector2D?} */
  #startPos = null;

  /** @type {Vector2D?} */
  #endPos = null;

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

    return this.#tileSprites[tileRule.texturePos.y][tileRule.texturePos.x];
  }

  /**
   * @param {'S' | 'E'} symbol
   * @returns {Vector2D?} position of special tile in the map
   */
  #findSpecialTile(symbol) {
    for (let y = 0; y < this.#heightTiles; y++) {
      for (let x = 0; x < this.#widthTiles; x++) {
        if (this.#tiles[y][x] === symbol) {
          return new Vector2D(x, y);
        }
      }
    }

    return null;
  }

  activate() {
    this.#tiles = stringToCharMatrix(/** @type {string} */ (this.getArg('map')));

    this.#heightTiles = this.#tiles.length;
    this.#widthTiles = Math.max(...this.#tiles.map((row) => row.length));

    this.#startPos = this.#findSpecialTile('S');
    this.#endPos = this.#findSpecialTile('E');
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

    _.each([this.#startPos, this.#endPos], (pos) => {
      if (pos) {
        frame.buffer.draw(pos.add(new Vector2D(-0.25, -0.75)).scale(TILE_SIZE), this.#doorSprite);
      }
    });
  }
}

export { LevelMap };
