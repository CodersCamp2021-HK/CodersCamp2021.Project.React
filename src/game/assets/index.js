import spritesUrl from './sprites.png';
import { Sprite, Vector2D } from '../shared';
import { Crop } from '../shared/Crop';

const AssetsManager = Object.freeze({
  trex0: new Sprite(spritesUrl, new Crop(new Vector2D(1678, 2), 88, 94)),
  trex1: new Sprite(spritesUrl, new Crop(new Vector2D(1854, 2), 88, 94)),
  trex2: new Sprite(spritesUrl, new Crop(new Vector2D(1942, 2), 88, 94)),
  ground: new Sprite(spritesUrl, new Crop(new Vector2D(2, 104), 500, 24)),
});

export { AssetsManager };
