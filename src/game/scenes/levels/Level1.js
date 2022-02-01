import { Pig } from '../../objects/Pig';
import { Vector } from '../../shared';
import { levelFrom } from '../LevelScene';

const Level1 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXXXXXXXXXXX
  XXX.........X...........X
  XXX.........X...........X
  X...........XXX.........X
  X.......................X
  X.E.X..............XX...X
  XXXXX.....XXXXXXX.......X
  X...........X.........XXX
  X....XXX................X
  X...................X...X
  X.S........XX.......X...X
  XXXX......XXX.......XXXXX
  XXXXXXXXXXXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Pig, new Vector(4, 4));
    create(Pig, new Vector(22, 10));
    create(Pig, new Vector(20, 8));
    create(Pig, new Vector(14, 2));
    create(Pig, new Vector(6, 7));
  },
});

export { Level1 };
