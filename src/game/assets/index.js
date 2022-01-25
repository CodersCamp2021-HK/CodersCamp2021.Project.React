import _ from 'lodash';
import { Sprite, Vector, Crop } from '../shared';
import { TILE_SIZE } from '../scenes/LevelScene/levelUtils';
import { tilesetRowCount } from '../scenes/LevelScene/tileRules';
import doorUrl from './door.png';
import spritesUrl from './sprites.png';
import tilesetUrl from './tileset.png';
import kingSpritesUrl from './kingSprites.png';

const scale = 2;

const AssetsManager = Object.freeze({
  kingIdle01: new Sprite(kingSpritesUrl, new Crop(new Vector(1569, 18), 37, 30)),
  kingIdle02: new Sprite(kingSpritesUrl, new Crop(new Vector(1647, 18), 37, 30)),
  kingIdle03: new Sprite(kingSpritesUrl, new Crop(new Vector(1725, 18), 37, 30)),
  kingIdle04: new Sprite(kingSpritesUrl, new Crop(new Vector(1803, 18), 37, 30)),
  kingIdle05: new Sprite(kingSpritesUrl, new Crop(new Vector(1881, 18), 37, 30)),
  kingIdle06: new Sprite(kingSpritesUrl, new Crop(new Vector(1959, 18), 37, 30)),
  kingIdle07: new Sprite(kingSpritesUrl, new Crop(new Vector(2037, 17), 37, 30)),
  kingIdle08: new Sprite(kingSpritesUrl, new Crop(new Vector(2115, 16), 37, 30)),
  kingIdle09: new Sprite(kingSpritesUrl, new Crop(new Vector(2193, 16), 37, 30)),
  kingIdle10: new Sprite(kingSpritesUrl, new Crop(new Vector(2271, 17), 37, 30)),
  kingIdle11: new Sprite(kingSpritesUrl, new Crop(new Vector(2349, 18), 37, 30)),

  kingRun01: new Sprite(kingSpritesUrl, new Crop(new Vector(2505, 18), 37, 30)),
  kingRun02: new Sprite(kingSpritesUrl, new Crop(new Vector(2584, 16), 37, 30)),
  kingRun03: new Sprite(kingSpritesUrl, new Crop(new Vector(2661, 17), 37, 30)),
  kingRun04: new Sprite(kingSpritesUrl, new Crop(new Vector(2739, 20), 37, 30)),
  kingRun05: new Sprite(kingSpritesUrl, new Crop(new Vector(2817, 18), 37, 30)),
  kingRun06: new Sprite(kingSpritesUrl, new Crop(new Vector(2895, 16), 37, 30)),
  kingRun07: new Sprite(kingSpritesUrl, new Crop(new Vector(2973, 17), 37, 30)),
  kingRun08: new Sprite(kingSpritesUrl, new Crop(new Vector(3051, 20), 37, 30)),

  kingHit01: new Sprite(kingSpritesUrl, new Crop(new Vector(3140, 0), 58, 46)),
  kingHit02: new Sprite(kingSpritesUrl, new Crop(new Vector(3219, 5), 51, 41)),
  kingHit03: new Sprite(kingSpritesUrl, new Crop(new Vector(3285, 16), 37, 30)),

  kingDoorIn01: new Sprite(kingSpritesUrl, new Crop(new Vector(639, 18), 37, 30)),
  kingDoorIn02: new Sprite(kingSpritesUrl, new Crop(new Vector(718, 18), 37, 30)),
  kingDoorIn03: new Sprite(kingSpritesUrl, new Crop(new Vector(797, 18), 37, 30)),
  kingDoorIn04: new Sprite(kingSpritesUrl, new Crop(new Vector(874, 18), 37, 30)),
  kingDoorIn05: new Sprite(kingSpritesUrl, new Crop(new Vector(952, 18), 37, 30)),

  kingJump: new Sprite(kingSpritesUrl, new Crop(new Vector(2427, 15), 37, 31)),
  kingFall: new Sprite(kingSpritesUrl, new Crop(new Vector(1257, 15), 37, 31)),
  kingGround: new Sprite(kingSpritesUrl, new Crop(new Vector(1335, 20), 37, 26)),

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
});

export { AssetsManager };
