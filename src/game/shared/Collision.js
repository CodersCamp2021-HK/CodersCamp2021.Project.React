class Collision {
  #gameObject1;

  #gameObject2;

  #resolutionOffset;

  /**
   * @param {import('../engine').GameObject} gameObject1
   * @param {import('../engine').GameObject} gameObject2
   * @param {import('./Vector').Vector} resolutionOffset
   */
  constructor(gameObject1, gameObject2, resolutionOffset) {
    if (gameObject1 === gameObject2) {
      throw new Error('Invalid collision.');
    }
    this.#gameObject1 = gameObject1;
    this.#gameObject2 = gameObject2;
    this.#resolutionOffset = resolutionOffset;
  }

  get gameObject1() {
    return this.#gameObject1;
  }

  get gameObject2() {
    return this.#gameObject2;
  }

  get resolutionOffset() {
    return this.#resolutionOffset;
  }
}

export { Collision };
