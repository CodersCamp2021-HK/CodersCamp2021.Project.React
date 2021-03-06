import { AssetsManager } from '../assets';
import { GameObject } from '../engine';
import { Vector } from '../shared';

class Heart extends GameObject {
  #sprite = AssetsManager.heart;

  /**
   * @param {Object} props
   * @param {Vector} props.initialPos
   */
  onActivate({ initialPos }) {
    this.transform.origin = initialPos ?? Vector.Zero;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    frame.buffer.draw(this.position, this.#sprite);
  }
}

export { Heart };
