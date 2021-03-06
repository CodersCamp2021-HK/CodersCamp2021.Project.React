import { Pig } from '../../objects/Pig';
import { Vector } from '../../shared';
import { levelFrom } from '../LevelScene';
import { Decoration } from '../../objects';

const Level1 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXXXXXXXXXXX
  XXX.........X...........X
  XXX.........X...........X
  X.....XX....XXX.........X
  X................XX.....X
  X.E.................XX..X
  XXXXXX....XXXXXXX.......X
  X...........X.........XXX
  X....XXX................X
  X...................X...X
  X.S........XX......XX...X
  XXXX......XXX.......XXXXX
  XXXXXXXXXXXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Decoration, new Vector(6, 1), { type: 'window' });
    create(Decoration, new Vector(14, 9), { type: 'window' });
    create(Decoration, new Vector(16, 9), { type: 'window' });
    create(Decoration, new Vector(17, 2), { type: 'window' });
    create(Decoration, new Vector(20, 3), { type: 'window' });
    create(Decoration, new Vector(22, 1), { type: 'flag' });
    create(Decoration, new Vector(3, 7), { type: 'flag' });
    create(Pig, new Vector(3, 5), { facing: 'right' });
    create(Pig, new Vector(22, 10));
    create(Pig, new Vector(20, 8));
    create(Pig, new Vector(14, 2), { facing: 'right' });
    create(Pig, new Vector(6, 7), { facing: 'right' });
    create(Pig, new Vector(7, 2), { facing: 'right' });
  },
});

export { Level1 };
