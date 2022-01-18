import { generateTileRules } from './levelUtils';

export const tileRules = generateTileRules(
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
