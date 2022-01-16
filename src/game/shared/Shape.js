class Shape {
  #path;

  #fill;

  #stroke;

  /**
   *
   * @param {Path2D} path
   * @param {string | undefined} fill
   * @param {string | undefined} stroke
   */
  constructor(path, fill, stroke) {
    this.#path = path;
    this.#fill = fill;
    this.#stroke = stroke;
  }

  get fill() {
    return this.#fill;
  }

  get path() {
    return this.#path;
  }

  get stroke() {
    return this.#stroke;
  }
}

export { Shape };
