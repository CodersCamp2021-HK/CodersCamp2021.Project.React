class CanvasDisplay {
  #canvas;

  #ctx;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.#canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      throw new Error('Canvas 2D context is needed');
    }
    this.#ctx = ctx;
  }

  /**
   * @param {import("./CanvasBuffer").CanvasBuffer} buffer
   */
  flush(buffer) {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.drawImage(buffer.canvas, 0, 0);
  }
}

export { CanvasDisplay };
