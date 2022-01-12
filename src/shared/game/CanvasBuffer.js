import { DisplayBuffer } from '../../game/proxy';

class CanvasBuffer extends DisplayBuffer {
  #canvas;

  #ctx;

  /** @type {Map<string, HTMLImageElement>} */
  #imageCache;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    super();
    this.#canvas = document.createElement('canvas');
    this.#canvas.width = canvas.width;
    this.#canvas.height = canvas.height;
    const ctx = this.#canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      throw new Error('Canvas 2D context is needed');
    }
    this.#ctx = ctx;
    this.#imageCache = new Map();
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.fillStyle = '#FFFFFF';
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.fill();
  }

  get width() {
    return this.#canvas.width;
  }

  get height() {
    return this.#canvas.height;
  }

  get canvas() {
    return this.#canvas;
  }

  /**
   *
   * @param {import('../../game/shared').Vector2D} position
   * @param {import('../../game/shared').Sprite} sprite
   */
  draw(position, sprite) {
    const img = this.#getImg(sprite.imgUrl);
    this.#ctx.drawImage(
      img,
      sprite.crop.origin.x,
      sprite.crop.origin.y,
      sprite.crop.width,
      sprite.crop.height,
      position.x,
      position.y,
      sprite.width,
      sprite.height,
    );
  }

  /**
   * @param {string} url
   */
  #getImg(url) {
    const maybeImg = this.#imageCache.get(url);
    if (maybeImg) {
      return maybeImg;
    }
    const img = new Image();
    img.src = url;
    this.#imageCache.set(url, img);
    return img;
  }
}

export { CanvasBuffer };
