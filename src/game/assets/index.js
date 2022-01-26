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
  kingIdle01: new Sprite(kingSpritesUrl, new Crop(new Vector(1569, 18), 37, 28)),
  kingIdle02: new Sprite(kingSpritesUrl, new Crop(new Vector(1647, 18), 37, 28)),
  kingIdle03: new Sprite(kingSpritesUrl, new Crop(new Vector(1725, 18), 37, 28)),
  kingIdle04: new Sprite(kingSpritesUrl, new Crop(new Vector(1803, 18), 37, 28)),
  kingIdle05: new Sprite(kingSpritesUrl, new Crop(new Vector(1881, 18), 37, 28)),
  kingIdle06: new Sprite(kingSpritesUrl, new Crop(new Vector(1959, 18), 37, 28)),
  kingIdle07: new Sprite(kingSpritesUrl, new Crop(new Vector(2037, 17), 37, 29)),
  kingIdle08: new Sprite(kingSpritesUrl, new Crop(new Vector(2115, 16), 37, 30)),
  kingIdle09: new Sprite(kingSpritesUrl, new Crop(new Vector(2193, 16), 37, 30)),
  kingIdle10: new Sprite(kingSpritesUrl, new Crop(new Vector(2271, 17), 37, 29)),
  kingIdle11: new Sprite(kingSpritesUrl, new Crop(new Vector(2349, 18), 37, 28)),

  kingRun01: new Sprite(kingSpritesUrl, new Crop(new Vector(2505, 18), 37, 28)),
  kingRun02: new Sprite(kingSpritesUrl, new Crop(new Vector(2584, 16), 37, 30)),
  kingRun03: new Sprite(kingSpritesUrl, new Crop(new Vector(2661, 17), 37, 29)),
  kingRun04: new Sprite(kingSpritesUrl, new Crop(new Vector(2739, 20), 37, 26)),
  kingRun05: new Sprite(kingSpritesUrl, new Crop(new Vector(2817, 18), 37, 28)),
  kingRun06: new Sprite(kingSpritesUrl, new Crop(new Vector(2895, 16), 37, 30)),
  kingRun07: new Sprite(kingSpritesUrl, new Crop(new Vector(2973, 17), 37, 29)),
  kingRun08: new Sprite(kingSpritesUrl, new Crop(new Vector(3051, 20), 37, 26)),

  kingAttack01: new Sprite(kingSpritesUrl, new Crop(new Vector(3140, 0), 58, 46)),
  kingAttack02: new Sprite(kingSpritesUrl, new Crop(new Vector(3219, 5), 51, 41)),
  kingAttack03: new Sprite(kingSpritesUrl, new Crop(new Vector(3285, 16), 37, 30)),

  kingDoorOut01: new Sprite(kingSpritesUrl, new Crop(new Vector(639, 5), 26, 41)),
  kingDoorOut02: new Sprite(kingSpritesUrl, new Crop(new Vector(718, 3), 26, 43)),
  kingDoorOut03: new Sprite(kingSpritesUrl, new Crop(new Vector(797, 5), 26, 41)),
  kingDoorOut04: new Sprite(kingSpritesUrl, new Crop(new Vector(874, 3), 26, 43)),
  kingDoorOut05: new Sprite(kingSpritesUrl, new Crop(new Vector(952, 5), 26, 41)),
  kingDoorOut06: new Sprite(kingSpritesUrl, new Crop(new Vector(1021, 13), 37, 33)),
  kingDoorOut07: new Sprite(kingSpritesUrl, new Crop(new Vector(1099, 14), 37, 32)),
  kingDoorOut08: new Sprite(kingSpritesUrl, new Crop(new Vector(1179, 20), 37, 26)),

  kingDoorIn01: new Sprite(kingSpritesUrl, new Crop(new Vector(6, 1), 37, 45)),
  kingDoorIn02: new Sprite(kingSpritesUrl, new Crop(new Vector(94, 6), 26, 40)),
  kingDoorIn03: new Sprite(kingSpritesUrl, new Crop(new Vector(175, 5), 29, 41)),
  kingDoorIn04: new Sprite(kingSpritesUrl, new Crop(new Vector(254, 6), 29, 40)),
  kingDoorIn05: new Sprite(kingSpritesUrl, new Crop(new Vector(331, 5), 29, 41)),
  kingDoorIn06: new Sprite(kingSpritesUrl, new Crop(new Vector(409, 6), 29, 40)),
  kingDoorIn07: new Sprite(kingSpritesUrl, new Crop(new Vector(488, 5), 29, 41)),
  kingDoorIn08: new Sprite(kingSpritesUrl, new Crop(new Vector(565, 6), 29, 40)),

  kingJump: new Sprite(kingSpritesUrl, new Crop(new Vector(2427, 15), 37, 31)),
  kingFall: new Sprite(kingSpritesUrl, new Crop(new Vector(1257, 15), 37, 31)),
  kingGround: new Sprite(kingSpritesUrl, new Crop(new Vector(1335, 20), 37, 26)),

  kingDead01: new Sprite(kingSpritesUrl, new Crop(new Vector(3360, 18), 37, 28)),
  kingDead02: new Sprite(kingSpritesUrl, new Crop(new Vector(3434, 25), 38, 21)),
  kingDead03: new Sprite(kingSpritesUrl, new Crop(new Vector(3511, 26), 38, 20)),
  kingDead04: new Sprite(kingSpritesUrl, new Crop(new Vector(3588, 27), 38, 19)),

  kingHit01: new Sprite(kingSpritesUrl, new Crop(new Vector(1411, 14), 37, 32)),
  kingHit02: new Sprite(kingSpritesUrl, new Crop(new Vector(1490, 15), 37, 31)),

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
