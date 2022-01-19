import { levelFrom } from '../LevelScene';

const Level1 = levelFrom({
  map: `
  XXXXXXXXXXXXXX
  XX.X.........X
  XXXXXXX....X.X
  X.....X......X
  X............X
  X............X
  X.....XXXX...X
  X..S...XXX.E.X
  XXXXXXXXXXXXXX`,
});

export { Level1 };
