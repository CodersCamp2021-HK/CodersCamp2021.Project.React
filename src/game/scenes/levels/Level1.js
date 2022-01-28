import { King } from '../../objects/King/King';
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
  X.....XXXXX....X
  X...XXXXXXXX.E.X
  X.S.XXXXXXXXXXXX
  XXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Pig, new Vector(6, 2));
    create(Pig, new Vector(12, 1));
    create(King, new Vector(2, 8));
  },
});

export { Level1 };
