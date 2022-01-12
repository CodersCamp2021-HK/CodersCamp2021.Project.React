/* eslint-disable class-methods-use-this */
import { AssetsManager } from '../assets';
import { Vector2D } from '../shared';
import { GameObject } from '../engine/GameObject';

class Trex extends GameObject {
  update(/** @type {import('../shared/Frame').Frame} */ frame) {
    frame.buffer.draw(new Vector2D(0, 0), AssetsManager.trex);
  }
}

export { Trex };
