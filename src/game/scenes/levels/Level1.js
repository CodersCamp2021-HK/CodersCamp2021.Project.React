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
    create(Pig, { args: { initialPos: new Vector(256, 64) } });
    create(Pig, { args: { initialPos: new Vector(400, 110) } });
  },
});

export { Level1 };
