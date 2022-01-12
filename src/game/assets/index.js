import spritesUrl from './sprites.png';
import { Sprite, Vector2D } from '../shared';
import { Crop } from '../shared/Crop';

const AssetsManager = Object.freeze({
  trex: new Sprite(spritesUrl, new Crop(new Vector2D(0, 0), 200, 100), 200, 100),
});

export { AssetsManager };
