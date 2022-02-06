import _ from 'lodash';
import { Sprite, Vector, Crop } from '../shared';
import { tilesetRowCount } from '../scenes/LevelScene/tileRules';
import { TILE_SIZE } from '../config';
import doorUrl from './door.png';
import tilesetUrl from './tileset.png';
import kingUrl from './king.png';
import pigUrl from './pig.png';
import flagUrl from './flag.png';
import windowUrl from './window.png';
import heartUrl from './heart.png';

const AssetsManager = Object.freeze({
  king: {
    doorIn: _.times(7, (x) => new Sprite(kingUrl, new Crop(new Vector(78 + 78 * x, 0), 78, 58))),
    doorOut: _.times(8, (x) => new Sprite(kingUrl, new Crop(new Vector(624 + 78 * x, 0), 78, 58))),
    fall: [new Sprite(kingUrl, new Crop(new Vector(1248, 0), 78, 58))],
    ground: [new Sprite(kingUrl, new Crop(new Vector(1326, 0), 78, 58))],
    hit: _.times(2, (x) => new Sprite(kingUrl, new Crop(new Vector(1404 + 78 * x, 0), 78, 58))),
    idle: _.times(11, (x) => new Sprite(kingUrl, new Crop(new Vector(1560 + 78 * x, 0), 78, 58))),
    jump: [new Sprite(kingUrl, new Crop(new Vector(2418, 0), 78, 58))],
    run: _.times(8, (x) => new Sprite(kingUrl, new Crop(new Vector(2496 + 78 * x, 0), 78, 58))),
    attack: _.times(3, (x) => new Sprite(kingUrl, new Crop(new Vector(3120 + 78 * x, 0), 78, 58))),
    dead: _.times(4, (x) => new Sprite(kingUrl, new Crop(new Vector(3354 + 78 * x, 0), 78, 58))),
  },
  tileset: _.range(tilesetRowCount).map((y) =>
    _.range(4).map(
      (x) => new Sprite(tilesetUrl, new Crop(new Vector(x * TILE_SIZE, y * TILE_SIZE), TILE_SIZE, TILE_SIZE)),
    ),
  ),
  door: {
    normal: [new Sprite(doorUrl, new Crop(new Vector(0, 0), 46, 56))],
    open: _.times(3, (x) => new Sprite(doorUrl, new Crop(new Vector(46 * x, 0), 46, 56))),
    close: _.times(3, (x) => new Sprite(doorUrl, new Crop(new Vector(92 - 46 * x, 0), 46, 56))),
  },
  flag: new Sprite(flagUrl, new Crop(new Vector(0, 0), 26, 89)),
  window: new Sprite(windowUrl, new Crop(new Vector(0, 0), 54, 57)),
  heart: new Sprite(heartUrl, new Crop(new Vector(0, 0), 18, 14)),
  pig: Object.fromEntries(
    ['basic', 'king'].map((variant, i) => [
      variant,
      {
        idle: _.times(11, (x) => new Sprite(pigUrl, new Crop(new Vector(34 * x, i * 140), 34, 28))),
        jump: [new Sprite(pigUrl, new Crop(new Vector(0, 28 + i * 140), 34, 28))],
        fall: [new Sprite(pigUrl, new Crop(new Vector(34, 28 + i * 140), 34, 28))],
        ground: [new Sprite(pigUrl, new Crop(new Vector(68, 28 + i * 140), 34, 28))],
        run: _.times(6, (x) => new Sprite(pigUrl, new Crop(new Vector(34 * x, 56 + i * 140), 34, 28))),
        attack: _.times(5, (x) => new Sprite(pigUrl, new Crop(new Vector(34 * x, 84 + i * 140), 34, 28))),
        hit: _.times(2, (x) => new Sprite(pigUrl, new Crop(new Vector(34 * x, 112 + i * 140), 34, 28))),
        dead: _.times(4, (x) => new Sprite(pigUrl, new Crop(new Vector(68 + 34 * x, 112 + i * 140), 34, 28))),
      },
    ]),
  ),
});

export { AssetsManager };
