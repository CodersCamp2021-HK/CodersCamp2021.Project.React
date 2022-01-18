import _ from 'lodash';
import { AssetsManager } from '../assets';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';

const TILE_SIZE = 32;

/**
 * @param {string} input string with 3 non-empty lines and 3 non-whitespace characters in each line
 * @returns {string[][]} array of 3 rows, each one being an array of 3 characters
 */
function stringToCharMatrix(input) {
  return input
    .trim()
    .split('\n')
    .map((line) => line.trim().split(''));
}

/**
 * @template T type of matrix's elements
 * @param {T[][]} input input matrix
 * @param {number} times number of 90 degree clockwise rotations to perform
 * @returns {T[][]}
 */
function rotateClockwiseMatrix3x3(input, times = 1) {
  let matrix = input;

  for (let i = 0; i < times; i++) {
    matrix = [
      [matrix[2][0], matrix[1][0], matrix[0][0]],
      [matrix[2][1], matrix[1][1], matrix[0][1]],
      [matrix[2][2], matrix[1][2], matrix[0][2]],
    ];
  }

  return matrix;
}

/**
 *
 * @param {string[]} templates
 * @returns {Readonly<{ pattern: ("X" | "." | "?")[][], solidPos: Vector2D, backgroundPos: Vector2D }[]>}
 */
function generateTileRules(templates) {
  return Object.freeze(
    templates.flatMap((ruleTemplate, templateIndex) => {
      const TILE_ORIENTATIONS = 4;
      const pattern = stringToCharMatrix(ruleTemplate);

      return _.times(TILE_ORIENTATIONS, (n) => ({
        pattern: /** @type {('X' | '.' | '?')[][]} */ (rotateClockwiseMatrix3x3(pattern, n)),
        solidPos: new Vector2D(n, templateIndex),
        backgroundPos: new Vector2D(TILE_ORIENTATIONS + n, templateIndex),
      }));
    }),
  );
}

const tileRules = generateTileRules(
  /**
   * Array of pattern templates - each one is a string containing 3 lines, each of which contains 3 characters.
   * It describes the "neighbourhood" of a given tile - its 8 neighbouring tiles. Meanings of characters:
   * - 'X' - there is a solid block at this place
   * - '.' - there is only background at this place
   * - '?' - it is irrelevant what this place contains
   * Each pattern template corresponds to a single row in tileset.png.
   * For each pattern template, there are four tile rules generated - one for each rotation: 0, 90, 180 and 270 deg.
   * @type {('X' | '.' | '?')[][]}
   * */ [
    `...
     .?.
     ...`,
    `XXX
     X?X
     XXX`,
  ],
);

/**
 * @param {('X' | '.' | '?')[][]} first
 * @param {('X' | '.' | '?')[][]} second
 * @returns {boolean}
 */
function patternsMatch(first, second) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const elem1 = first[row][col];
      const elem2 = second[row][col];

      if (elem1 !== elem2 && elem1 !== '?' && elem2 !== '?') {
        return false;
      }
    }
  }

  return true;
}

class Terrain extends GameObject {
  #sprites = AssetsManager.terrain;

  #doorSprite = AssetsManager.door;

  /** @type {string[][]} */
  #map = [];

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

    return this.#map[y][x] === 'X' ? 'X' : '.';
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {import('../shared').Sprite}
   */
  #getTileSprite(x, y) {
    const neighbours = _.times(3, (row) => _.times(3, (col) => this.#getTileType(x + col - 1, y + row - 1)));
    const tileRule = tileRules.find((rule) => patternsMatch(neighbours, rule.pattern)) ?? tileRules[0];
    const texturePos = this.#getTileType(x, y) === 'X' ? tileRule.solidPos : tileRule.backgroundPos;

    return this.#sprites[texturePos.y][texturePos.x];
  }

  activate() {
    this.#map = stringToCharMatrix(/** @type {string} */ (this.getArg('map')));

    this.#heightTiles = this.#map.length;
    this.#widthTiles = Math.max(...this.#map.map((row) => row.length));
  }

  /**
   * @param {import('../shared').Frame} frame
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

export { Terrain };
