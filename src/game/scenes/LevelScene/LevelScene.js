import _ from 'lodash';
import { AssetsManager } from '../../assets';
import { GameScene } from '../../engine/GameScene';
import { BackgroundTiles, Door, SolidTile } from '../../objects';
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
  }

  #tileSprites = AssetsManager.tileset;

  #doorSprite = AssetsManager.door;

  /** @type {string[][]} */
  #tiles;

  /** @type {number} */
  #heightTiles;

  /** @type {number} */
  #widthTiles;

  /**
   * @param {number} x
   * @param {number} y
   * @returns {'solid' | 'background'}
   */
  #getTileType(x, y) {
    if (x < 0 || x >= this.#widthTiles || y < 0 || y >= this.#heightTiles) {
      return 'solid';
    }

    return this.#tiles[y][x] === 'X' ? 'solid' : 'background';
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {import('../../shared').Sprite}
   */
  #getTileSprite(x, y) {
    const neighbours = _.times(3, (row) =>
      _.times(3, (col) => (this.#getTileType(x + col - 1, y + row - 1) === 'solid' ? 'X' : '.')),
    );
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
    /** @type {{ position: Vector2D, sprite: import('../../shared').Sprite }[]} */
    const backgroundTiles = [];

    for (let y = 0; y < this.#heightTiles; y++) {
      for (let x = 0; x < this.#widthTiles; x++) {
        const data = { position: new Vector2D(x * TILE_SIZE, y * TILE_SIZE), sprite: this.#getTileSprite(x, y) };

        if (this.#getTileType(x, y) === 'solid') {
          this.createGameObject(SolidTile, {
            args: data,
          });
        } else {
          backgroundTiles.push(data);
        }
      }
    }

    this.createGameObject(BackgroundTiles, { args: { tiles: backgroundTiles } });

    this.createGameObject(Door, { args: { position: this.#findSpecialTile('S')?.scale(TILE_SIZE), type: 'start' } });
    this.createGameObject(Door, { args: { position: this.#findSpecialTile('E')?.scale(TILE_SIZE), type: 'end' } });

    // TODO: Spawn player at this.#findSpecialTile('S')
  }
}

export { LevelScene };
