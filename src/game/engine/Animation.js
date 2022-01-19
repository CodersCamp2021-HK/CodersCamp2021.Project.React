class Animation {
  #frameCount = 0;

  constructor(animationInterval, assets) {
    this.animationInterval = animationInterval;
    this.assets = assets;
    this.sprite = assets[0];
  }

  update(buffer, position) {
    this.#frameCount += 1;
    if (this.#frameCount === this.animationInterval) {
      this.sprite = this.sprite === this.assets[0] ? this.assets[1] : this.assets[0];
      this.#frameCount = 0;
    }
    buffer.draw(position, this.sprite);
  }
}

export { Animation };
