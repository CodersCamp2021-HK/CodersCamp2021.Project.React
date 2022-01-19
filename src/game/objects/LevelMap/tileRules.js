import { generateTileRules } from './levelUtils';

const [tileRules, tilesetRowCount] = generateTileRules(
  /**
   * Each tile type has a number of different sprites depending on it's surroundings.
   * Which sprite should be used depends on the 8 tiles next to a given tile.
   * Those rules are generated based on this array.
   * Each array element corresponds to a single row in tileset.png.
   * It describes the neighbourhood corresponding to the first element in the given row of tileset.png.
   *
   * Meanings of symbols:
   * - 'X' - there is a solid block at this place
   * - '.' - there is only background at this place
   * - '?' - it is irrelevant what this place contains
   * For each pattern template, there are four tile rules generated - one for each rotation: 0, 90, 180 and 270 deg.
   */ [
    `XXX
     XXX
     XXX`,
    `?.?
     .X.
     ?.?`,
    `?.?
     XXX
     XXX`,
    `?.?
     .X.
     ?X?`,
    `?.?
     XX.
     XX?`,
    `XX.
     XXX
     XXX`,
    `?X?
     .X.
     ?X?`,
    `.X.
     XXX
     XXX`,
    `.X.
     XXX
     XX.`,
    `.X.
     XXX
     .X.`,
    `XX.
     XXX
     .XX`,
    `XX.
     XXX
     ?.?`,
    `?X.
     .XX
     ?XX`,
    `?X.
     .XX
     ?X.`,
    `?X.
     .XX
     ?.?`,
    `...
     ...
     ...`,
    `?X?
     X.X
     ?X?`,
    `?X?
     X.X
     ?.?`,
    `?X?
     ...
     ...`,
    `?X?
     ..X
     ..?`,
    `?.?
     X.X
     ?.?`,
    `..X
     ...
     ...`,
    `X.X
     ...
     ...`,
    `X.X
     ...
     ..X`,
    `X.X
     ...
     X.X`,
    `..X
     ...
     X..`,
    `..X
     ...
     ?X?`,
    `?.X
     X..
     ?..`,
    `?X?
     ...
     X.X`,
    `?.X
     X..
     ?X?`,
  ],
);

export { tileRules, tilesetRowCount };
