import _ from 'lodash';
import { tileRules } from './tileRules';
import { patternsMatch } from './levelUtils';

describe('tileRules', () => {
  it('matches every possible neighbourhood to exactly one rule', () => {
    const TILE_TYPES = 2;
    const PATTERN_SIDE = 3;

    const allPossibleNeighbourhoods = _.times(TILE_TYPES ** (PATTERN_SIDE ** 2), (n) =>
      _.chunk(
        // Represent the number as binary (000000000 to 111111111) where 1 is a solid block and 0 a background
        n
          .toString(TILE_TYPES)
          .padStart(PATTERN_SIDE ** 2, '0')
          .split('')
          .map((d) => (d === '1' ? 'X' : '.')),
        PATTERN_SIDE,
      ),
    );

    for (const pattern of allPossibleNeighbourhoods) {
      const matchingPatterns = tileRules.filter((rule) => patternsMatch(pattern, rule.pattern));

      expect(matchingPatterns).toHaveLength(1);
    }
  });
});
