class Crop {
  #origin;

  #width;

  #height;

  /**
   * @param {import('./Vector2D').Vector2D} origin
   * @param {number} width
   * @param {number} height
   */
  constructor(origin, width, height) {
    this.#origin = origin;
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get origin() {
    return this.#origin;
  }

  /**
   * @param {number} width
   */
  setWidth(width) {
    return new Crop(this.#origin, width, this.#height);
  }

  /**
   * @param {number} height
   */
  setHeight(height) {
    return new Crop(this.#origin, this.#width, height);
  }

  /**
   * @param {import('./Vector2D').Vector2D} origin
   */
  setOrigin(origin) {
    return new Crop(origin, this.#width, this.#height);
  }
}

export { Crop };
