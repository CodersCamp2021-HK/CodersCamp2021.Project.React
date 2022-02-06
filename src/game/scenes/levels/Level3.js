import { Pig } from '../../objects/Pig';
import { Vector } from '../../shared';
import { levelFrom } from '../LevelScene';
import { Decoration } from '../../objects';

const Level3 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXXXXXXXXXXX
  XXX.......XX............X
  XXX........X............X
  X............XXXXXXXXXXXX
  X.....XXX....X..........X
  X.........XX........XX..X
  X..XX............XX.....X
  X...XX........X.......XXX
  X......XXXXXX..........XX
  X...................X...X
  X.S.......XX.......XX...X
  XXXX.....XXX...XX...XXXXX
  XXXXXXXXXXXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Decoration, new Vector(11, 6), { type: 'window' });
    create(Decoration, new Vector(9, 6), { type: 'window' });
    create(Decoration, new Vector(7, 6), { type: 'window' });
    create(Decoration, new Vector(1, 6), { type: 'flag' });
    create(Pig, new Vector(23, 2), { variant: 'king', facing: 'left' });
    create(Pig, new Vector(13, 10), { facing: 'right' });
    create(Pig, new Vector(20, 2), { facing: 'left' });
    create(Pig, new Vector(18, 2), { facing: 'left' });
    create(Pig, new Vector(16, 2), { facing: 'left' });
    create(Pig, new Vector(22, 10), { facing: 'left' });
    create(Pig, new Vector(19, 9));
    create(Pig, new Vector(14, 6), { facing: 'right' });
  },
});

export { Level3 };
