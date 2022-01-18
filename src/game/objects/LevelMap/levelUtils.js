import _ from 'lodash';
import { Vector2D } from '../../shared';

/**
 * @param {string} input string with 3 non-empty lines and 3 non-whitespace characters in each line
 * @returns {string[][]} array of 3 rows, each one being an array of 3 characters
 */
export function stringToCharMatrix(input) {
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
 * @param {string[]} templates
 * @returns {Readonly<{ pattern: ("X" | "." | "?")[][], texturePos: Vector2D }[]>}
 */
export function generateTileRules(templates) {
  return Object.freeze(
    templates.flatMap((ruleTemplate, templateIndex) => {
      const pattern = stringToCharMatrix(ruleTemplate);

      return _.times(4, (n) => ({
        pattern: /** @type {('X' | '.' | '?')[][]} */ (rotateClockwiseMatrix3x3(pattern, n)),
        texturePos: new Vector2D(n, templateIndex),
      }));
    }),
  );
}

/**
 * @param {('X' | '.' | '?')[][]} first
 * @param {('X' | '.' | '?')[][]} second
 * @returns {boolean}
 */
export function patternsMatch(first, second) {
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
