import _ from 'lodash';
import spritesUrl from './sprites.png';
import tilesetUrl from './tileset.png';
import doorUrl from './door.png';
import { Sprite, Vector2D } from '../shared';
import { Crop } from '../shared/Crop';
import { tilesetRowCount } from '../scenes/LevelScene/tileRules';
import { TILE_SIZE } from '../scenes/LevelScene/levelUtils';

const scale = 0.5;

const AssetsManager = Object.freeze({
  trexJump: new Sprite(spritesUrl, new Crop(new Vector2D(1678, 2), 88, 94), scale),
  trexColision: new Sprite(spritesUrl, new Crop(new Vector2D(2030, 2), 88, 94), scale),
  trexRun1: new Sprite(spritesUrl, new Crop(new Vector2D(1854, 2), 88, 94), scale),
  trexRun2: new Sprite(spritesUrl, new Crop(new Vector2D(1942, 2), 88, 94), scale),
  trexBend1: new Sprite(spritesUrl, new Crop(new Vector2D(2206, 36), 118, 60), scale),
  trexBend2: new Sprite(spritesUrl, new Crop(new Vector2D(2324, 36), 118, 60), scale),
  ground: new Sprite(spritesUrl, new Crop(new Vector2D(2, 104), 1000, 24), scale),
  bird1: new Sprite(spritesUrl, new Crop(new Vector2D(260, 14), 92, 68), scale),
  bird2: new Sprite(spritesUrl, new Crop(new Vector2D(352, 2), 92, 60), scale),
  cactusSmall: _.range(0, 6).map((x) => new Sprite(spritesUrl, new Crop(new Vector2D(446 + x * 34, 2), 34, 70), scale)),
  cactusLarge: _.range(0, 3).map(
    (x) => new Sprite(spritesUrl, new Crop(new Vector2D(652 + x * 50, 2), 50, 100), scale),
  ),
  tileset: _.range(tilesetRowCount).map((y) =>
    _.range(4).map(
      (x) => new Sprite(tilesetUrl, new Crop(new Vector2D(x * TILE_SIZE, y * TILE_SIZE), TILE_SIZE, TILE_SIZE)),
    ),
  ),
  door: new Sprite(doorUrl, new Crop(new Vector2D(0, 0), 46, 56)),
});

export { AssetsManager };
