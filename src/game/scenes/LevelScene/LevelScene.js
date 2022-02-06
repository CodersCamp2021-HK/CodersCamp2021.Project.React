import _ from 'lodash';
import { AssetsManager } from '../../assets';
import { KING_MAX_HP, TILE_SIZE } from '../../config';
import { GameScene } from '../../engine';
import { BackgroundTiles, Door, SolidTile, King } from '../../objects';
import { Heart } from '../../objects/Heart';
import { Vector } from '../../shared';
import { patternsMatch, stringToCharMatrix } from './levelUtils';
import { tileRules } from './tileRules';

/**
 * @typedef {Object} LevelInfo Object containing information about a given level.
 * @property {string} map A representation of the map in form of a multiline string,
 * where 'X' encodes a wall, '.' a background, 'S' the start door and 'E' the end door.
 * The map is as wide as the amount of columns in the string and as high as the amount
 * of rows. It should have a rectangular shape.
 * @property {(create: (Cls: Parameters<typeof LevelScene.prototype.create>[0], pos: Vector, otherArgs?: Record<string, any>) => void) => void} [additionalObjects]
 */

class LevelScene extends GameScene {
  #tileSprites = AssetsManager.tileset;

  /** @type {string[][]} */
  // @ts-ignore
  #tiles;

  /** @type {number} */
  // @ts-ignore
  #heightTiles;

  /** @type {number} */
  // @ts-ignore
  #widthTiles;

  /** @type {King?} */
  #king = null;

  get king() {
    return this.#king;
  }

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
   * @returns {Vector?} position of special tile in the map
   */
  #findSpecialTile(symbol) {
    for (let y = 0; y < this.#heightTiles; y++) {
      for (let x = 0; x < this.#widthTiles; x++) {
        if (this.#tiles[y][x] === symbol) {
          return new Vector(x, y);
        }
      }
    }

    return null;
  }

  /**
   * @param {LevelInfo} levelInfo
   */
  initialize(levelInfo) {
    this.#tiles = stringToCharMatrix(levelInfo.map);
    this.#heightTiles = this.#tiles.length;
    this.#widthTiles = Math.max(...this.#tiles.map((row) => row.length));

    /** @type {{ position: Vector, sprite: import('../../shared').Sprite }[]} */
    const backgroundTiles = [];

    for (let y = 0; y < this.#heightTiles; y++) {
      for (let x = 0; x < this.#widthTiles; x++) {
        const data = { position: new Vector(x * TILE_SIZE, y * TILE_SIZE), sprite: this.#getTileSprite(x, y) };

        if (this.#getTileType(x, y) === 'solid') {
          this.create(SolidTile, {
            args: data,
          });
        } else {
          backgroundTiles.push(data);
        }
      }
    }

    this.create(BackgroundTiles, { args: { tiles: backgroundTiles } });

    this.create(Door, {
      args: {
        position: this.#findSpecialTile('S')?.scale(TILE_SIZE) ?? Vector.Zero,
        type: 'start',
      },
    });

    this.create(Door, {
      args: {
        position: this.#findSpecialTile('E')?.scale(TILE_SIZE) ?? Vector.Zero,
        type: 'end',
      },
    });

    if (levelInfo.additionalObjects) {
      levelInfo.additionalObjects((Cls, pos, otherArgs = {}) => {
        this.create(Cls, {
          args: {
            initialPos: pos.add(new Vector(0.5, 0.5)).scale(TILE_SIZE),
            level: this,
            ...otherArgs,
          },
        });
      });
    }

    this.#king = this.create(King, {
      args: {
        position: this.#findSpecialTile('S')?.scale(TILE_SIZE) ?? Vector.Zero,
      },
    });
  }
}

export { LevelScene };
