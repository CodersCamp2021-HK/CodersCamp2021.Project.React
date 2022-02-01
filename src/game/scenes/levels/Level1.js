import { Pig } from '../../objects/Pig';
import { Vector } from '../../shared';
import { levelFrom } from '../LevelScene';

const Level1 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXX
  XX...........XXX
  X.............XX
  X...XXXX.......X
  X.....XXX...XXXX
  XXX...XXXX.....X
  X.....XXXXX..E.X
  X.S.XXXXXXXXXXXX
  XXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Pig, new Vector(6, 2));
    create(Pig, new Vector(12, 1));
  },
});

export { Level1 };
