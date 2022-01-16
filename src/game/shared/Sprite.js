class Sprite {
  #imgUrl;

  #crop;

  #scale;

  #width;

  #height;

  /**
   *
   * @param {string} imgUrl
   * @param {import('./Crop').Crop} crop
   * @param {number | undefined} scale
   */
  constructor(imgUrl, crop, scale = undefined) {
    this.#imgUrl = imgUrl;
    this.#crop = crop;
    this.#scale = scale ?? 1;
    this.#width = crop.width * this.#scale;
    this.#height = crop.height * this.#scale;
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

  /**
   * @param {import("./Crop").Crop} crop
   */
  setCrop(crop) {
    return new Sprite(this.imgUrl, crop, this.#scale);
  }

  get imgUrl() {
    return this.#imgUrl;
  }
}

export { Sprite };
