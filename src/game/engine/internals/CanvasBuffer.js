import { Sprite } from '../../shared';

class CanvasBuffer {
  #canvas;

  #ctx;

  /** @type {Map<string, HTMLImageElement>} */
  #imageCache;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
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
   * @param {import('../../shared').Vector} position
   * @param {Sprite | import('../../shared').Shape} sprite
   */
  draw(position, sprite) {
    if (sprite instanceof Sprite) {
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
    } else {
      const shape = sprite;
      if (shape.fill) {
        const tmp = this.#ctx.fillStyle;
        this.#ctx.fillStyle = shape.fill;
        this.#ctx.fill(shape.path);
        this.#ctx.fillStyle = tmp;
      }
      if (shape.stroke) {
        const tmp = this.#ctx.strokeStyle;
        this.#ctx.strokeStyle = shape.stroke;
        this.#ctx.stroke(shape.path);
        this.#ctx.strokeStyle = tmp;
      }
    }
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
