class Sprite {
  #imgUrl;

  #crop;

  #width;

  #height;

  /**
   *
   * @param {string} imgUrl
   * @param {import('./Crop').Crop} crop
   * @param {number} width
   * @param {number} height
   */
  constructor(imgUrl, crop, width, height) {
    this.#imgUrl = imgUrl;
    this.#crop = crop;
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get crop() {
    return this.#crop;
  }

  get imgUrl() {
    return this.#imgUrl;
  }
}

export { Sprite };
