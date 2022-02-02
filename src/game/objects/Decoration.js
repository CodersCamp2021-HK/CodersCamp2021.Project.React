import { AssetsManager } from '../assets';
import { GameObject } from '../engine';
import { Vector } from '../shared';

class Decoration extends GameObject {
  #sprite = AssetsManager.window;

  /**
   * @param {Object} props
   * @param {Vector} props.initialPos
   * @param {'window' | 'flag'} props.type
   */
  onActivate({ initialPos, type }) {
    this.#sprite = type === 'window' ? AssetsManager.window : AssetsManager.flag;
    this.transform.origin = initialPos ?? Vector.Zero;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    frame.buffer.draw(this.position, this.#sprite);
  }
}

export { Decoration };
