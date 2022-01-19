import { AssetsManager } from '../assets';
import { BoxCollider } from '../engine/BoxCollider';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';

class SolidTile extends GameObject {
  #sprite = AssetsManager.tileset[0][0];

  activate() {
    this.position = this.getArg('position');
    this.#sprite = this.getArg('sprite');
    this.setCollider(BoxCollider, [new Vector2D(this.#sprite.width, this.#sprite.height)]);
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    frame.buffer.draw(this.position, this.#sprite);
  }
}

export { SolidTile };
