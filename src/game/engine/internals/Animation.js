class Animation {
  #isFinished = false;

  #flipped = false;

  /**
   * @type {boolean | undefined}
   */
  #doOnce;

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

  get sprite() {
    return this.#sprite;
  }

  get isFinished() {
    return this.#isFinished;
  }

  /**
   * @param {boolean} b
   */
  set flipped(b) {
    this.#flipped = b;
  }

  /**
   * @param {number} animationInterval
   * @param {import('../../shared').Sprite[]} assets
   * @param {boolean} doOnce
   */
  reset(animationInterval, assets, doOnce = false) {
    this.#animationInterval = animationInterval;
    this.#assets = assets;
    // eslint-disable-next-line prefer-destructuring
    this.#sprite = this.#assets.length > 0 ? this.#assets[0] : undefined;
    this.#frameCount = 0;
    this.#doOnce = doOnce;
    this.#isFinished = false;
  }

  /**
   * @param {import('../../shared').Buffer} buffer
   * @param {import('../../shared').Vector} position
   */
  update(buffer, position) {
    if (!this.#sprite) return;
    this.#frameCount += 1;
    if (this.#frameCount === this.#animationInterval) {
      if (this.#nextSprite() === this.#assets[0] && this.#doOnce) {
        this.#isFinished = true;
      } else {
        this.#isFinished = false;
        this.#sprite = this.#nextSprite();
        this.#frameCount = 0;
      }
    }
    const spriteToDraw = this.#flipped ? this.#sprite.flip() : this.#sprite;
    buffer.draw(position, spriteToDraw);
  }

  #nextSprite() {
    const nextElemIndex =
      // @ts-ignore
      this.#assets.indexOf(this.#sprite) + 1 === this.#assets.length ? 0 : this.#assets.indexOf(this.#sprite) + 1;
    return this.#assets[nextElemIndex];
  }
}

export { Animation };
