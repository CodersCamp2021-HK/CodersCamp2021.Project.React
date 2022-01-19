import _ from 'lodash';
import { AssetsManager } from '../../assets';
import { GameScene } from '../../engine/GameScene';
import { Vector2D } from '../../shared';
import { patternsMatch, stringToCharMatrix, TILE_SIZE } from './levelUtils';
import { tileRules } from './tileRules';

/**
 * @typedef {Object} LevelInfo Object containing information about a given level.
 * @property {string} map A representation of the map in form of a multiline string,
 * where 'X' encodes a wall, '.' a background, 'S' the start door and 'E' the end door.
 * The map is as wide as the amount of columns in the string and as high as the amount
 * of rows. It should have a rectangular shape.
 */

class LevelScene extends GameScene {
  /**
   * @param {import('../../engine/GameEngine').Services} services
   * @param {LevelInfo} levelInfo
   */
  constructor(services, levelInfo) {
    super(services);

    this.#tiles = stringToCharMatrix(levelInfo.map);
    this.#heightTiles = this.#tiles.length;
    this.#widthTiles = Math.max(...this.#tiles.map((row) => row.length));

    this.#startPos = this.#findSpecialTile('S');
    this.#endPos = this.#findSpecialTile('E');
  }

  #tileSprites = AssetsManager.tileset;

  #doorSprite = AssetsManager.door;

  /** @type {string[][]} */
  #tiles;

  /** @type {number} */
  #heightTiles;

  /** @type {number} */
  #widthTiles;

  /** @type {Vector2D?} */
  #startPos;

  /** @type {Vector2D?} */
  #endPos;

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

  // eslint-disable-next-line class-methods-use-this
  activate() {}

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

export { LevelScene };
