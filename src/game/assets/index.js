import spritesUrl from './sprites.png';
import { Sprite, Vector2D } from '../shared';
import { Crop } from '../shared/Crop';

const scale = 0.5;

const AssetsManager = Object.freeze({
  trexJump: new Sprite(spritesUrl, new Crop(new Vector2D(1678, 2), 88, 94), scale),
  trexColision: new Sprite(spritesUrl, new Crop(new Vector2D(2030, 2), 88, 94), scale),
  trexRun1: new Sprite(spritesUrl, new Crop(new Vector2D(1854, 2), 88, 94), scale),
  trexRun2: new Sprite(spritesUrl, new Crop(new Vector2D(1942, 2), 88, 94), scale),
  trexBend1: new Sprite(spritesUrl, new Crop(new Vector2D(2206, 36), 118, 60), scale),
  trexBend2: new Sprite(spritesUrl, new Crop(new Vector2D(2324, 36), 118, 60), scale),
  ground: new Sprite(spritesUrl, new Crop(new Vector2D(2, 104), 1000, 24), scale),
});

export { AssetsManager };
