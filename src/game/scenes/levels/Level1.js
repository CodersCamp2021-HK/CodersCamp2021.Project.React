import { Pig } from '../../objects/Pig';
import { Vector } from '../../shared';
import { levelFrom } from '../LevelScene';

const Level1 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  XX...........XXX...............X
  X.............XX...............X
  X...XXXX.......X...............X
  X.....XXX...XXXX...............X
  XXX...XXXX.....X...............X
  X.....XXXXX....X...............X
  X...XXXXXXXX.E.X...............X
  X.S.XXXXXXXXXXXX...............X
  X.XXXXXXXXXXXXXX...............X
  X.SXXXXXXXXXXXXX...............X
  X.S.XXXXXXXXXXXX...............X
  X.S.XXXXXXXXXXXX...............X
  X.S.XXXXXX....................XX
  X.S.XXXX.....XXX...............X
  X.S.......XXXXXX...............X
  X.S....XXXXXXXXX...............X
  X.S.XXXXXXXXXXXX...............X
  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Pig, new Vector(6, 2));
    create(Pig, new Vector(12, 1));
  },
});

export { Level1 };
