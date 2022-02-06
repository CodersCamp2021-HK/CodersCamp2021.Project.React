import { Decoration } from '../../objects';
import { Pig } from '../../objects/Pig';
import { Vector } from '../../shared';
import { levelFrom } from '../LevelScene';

const Level2 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXXXXXXXXXXX
  X.......................X
  X.......................X
  X...........X....XX.....X
  X......XXXXXXXXXXXXXX...X
  X.E...................XXX
  XXXX....................X
  X...X.......XXX......XX.X
  X.........X.....XX....X.X
  X......X..X..X..........X
  X...XX.......X......XXXXX
  X.S.X........XX.........X
  XXXXXXXXXXXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Decoration, new Vector(10, 1), { type: 'window' });
    create(Decoration, new Vector(13, 1), { type: 'window' });
    create(Decoration, new Vector(16, 1), { type: 'window' });
    create(Decoration, new Vector(19, 1), { type: 'window' });
    create(Decoration, new Vector(6, 1), { type: 'window' });
    create(Decoration, new Vector(7, 6), { type: 'window' });
    create(Decoration, new Vector(18, 5), { type: 'flag' });
    create(Decoration, new Vector(3, 1), { type: 'flag' });
    create(Pig, new Vector(5, 11), { facing: 'right' });
    create(Pig, new Vector(12, 11));
    create(Pig, new Vector(23, 9));
    create(Pig, new Vector(15, 3), { facing: 'right' });
  },
});

export { Level2 };
