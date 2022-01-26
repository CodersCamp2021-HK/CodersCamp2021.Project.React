import _ from 'lodash';
import { Sprite, Vector, Crop } from '../shared';
import { TILE_SIZE } from '../scenes/LevelScene/levelUtils';
import { tilesetRowCount } from '../scenes/LevelScene/tileRules';
import doorUrl from './door.png';
import spritesUrl from './sprites.png';
import tilesetUrl from './tileset.png';
import pigUrl from './pig.png';

const scale = 0.5;

const AssetsManager = Object.freeze({
  trexJump: new Sprite(spritesUrl, new Crop(new Vector(1678, 2), 88, 94), scale),
  trexColision: new Sprite(spritesUrl, new Crop(new Vector(2030, 2), 88, 94), scale),
  trexRun1: new Sprite(spritesUrl, new Crop(new Vector(1854, 2), 88, 94), scale),
  trexRun2: new Sprite(spritesUrl, new Crop(new Vector(1942, 2), 88, 94), scale),
  trexBend1: new Sprite(spritesUrl, new Crop(new Vector(2206, 36), 118, 60), scale),
  trexBend2: new Sprite(spritesUrl, new Crop(new Vector(2324, 36), 118, 60), scale),
  ground: new Sprite(spritesUrl, new Crop(new Vector(2, 104), 1000, 24), scale),
  bird1: new Sprite(spritesUrl, new Crop(new Vector(260, 14), 92, 68), scale),
  bird2: new Sprite(spritesUrl, new Crop(new Vector(352, 2), 92, 60), scale),
  cactusSmall: _.range(0, 6).map((x) => new Sprite(spritesUrl, new Crop(new Vector(446 + x * 34, 2), 34, 70), scale)),
  cactusLarge: _.range(0, 3).map((x) => new Sprite(spritesUrl, new Crop(new Vector(652 + x * 50, 2), 50, 100), scale)),
  tileset: _.range(tilesetRowCount).map((y) =>
    _.range(4).map(
      (x) => new Sprite(tilesetUrl, new Crop(new Vector(x * TILE_SIZE, y * TILE_SIZE), TILE_SIZE, TILE_SIZE)),
    ),
  ),
  door: new Sprite(doorUrl, new Crop(new Vector(0, 0), 46, 56)),
  pig: {
    idle: _.times(11, (x) => new Sprite(pigUrl, new Crop(new Vector(34 * x, 0), 34, 28))),
    jump: new Sprite(pigUrl, new Crop(new Vector(0, 28), 34, 28)),
    fall: [new Sprite(pigUrl, new Crop(new Vector(34, 28), 34, 28))],
    ground: new Sprite(pigUrl, new Crop(new Vector(68, 28), 34, 28)),
    run: _.times(6, (x) => new Sprite(pigUrl, new Crop(new Vector(34 * x, 56), 34, 28))),
    attack: _.times(5, (x) => new Sprite(pigUrl, new Crop(new Vector(34 * x, 84), 34, 28))),
    hit: _.times(2, (x) => new Sprite(pigUrl, new Crop(new Vector(34 * x, 112), 34, 28))),
    dead: _.times(4, (x) => new Sprite(pigUrl, new Crop(new Vector(68 + 34 * x, 112), 34, 28))),
  },
});

export { AssetsManager };
