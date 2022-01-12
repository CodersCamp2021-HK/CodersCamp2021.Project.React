import { Display } from '../../game/proxy';
import { CanvasBuffer } from './CanvasBuffer';

class CanvasDisplay extends Display {
  #canvas;

  #ctx;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    super();
    this.#canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      throw new Error('Canvas 2D context is needed');
    }
    this.#ctx = ctx;
  }

  /**
   * @param {import("../../game/proxy/DisplayBuffer").DisplayBuffer} buffer
   */
  flush(buffer) {
    if (!(buffer instanceof CanvasBuffer)) {
      throw new Error('Only canvas buffer is supported');
    }
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.drawImage(buffer.canvas, 0, 0);
  }
}

export { CanvasDisplay };
