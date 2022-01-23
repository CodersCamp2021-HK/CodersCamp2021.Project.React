class Animation {
  #frameCount = 0;

  #animationInterval = 0;

  /**
   * @type {import('../../shared').Sprite[]}
   */
  #assets = [];

  /**
   * @type {import('../../shared').Sprite | undefined}
   */
  #sprite;

  /**
   * @param {number} animationInterval
   * @param {import('../../shared').Sprite[]} assets
   */
  reset(animationInterval, assets) {
    this.#animationInterval = animationInterval;
    this.#assets = assets;
    // eslint-disable-next-line prefer-destructuring
    this.#sprite = this.#assets.length > 0 ? this.#assets[0] : undefined;
    this.#frameCount = 0;
  }

  get sprite() {
    return this.#sprite;
  }

  /**
   * @param {import('../../shared').Buffer} buffer
   * @param {import('../../shared').Vector} position
   */
  update(buffer, position) {
    if (!this.#sprite) return;
    this.#frameCount += 1;
    if (this.#frameCount === this.#animationInterval) {
      this.#sprite = this.#nextSprite();
      this.#frameCount = 0;
    }
    buffer.draw(position, this.#sprite);
  }

  #nextSprite() {
    const nextElemIndex =
      // @ts-ignore
      this.#assets.indexOf(this.#sprite) + 1 === this.#assets.length ? 0 : this.#assets.indexOf(this.#sprite) + 1;
    return this.#assets[nextElemIndex];
  }
}

export { Animation };
