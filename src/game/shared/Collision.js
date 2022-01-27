class Collision {
  #gameObject1;

  #gameObject2;

  #resolutionVector;

  /**
   * @param {import('../engine').GameObject} gameObject1
   * @param {import('../engine').GameObject} gameObject2
   * @param {import('./Vector').Vector} resolutionVector
   */
  constructor(gameObject1, gameObject2, resolutionVector) {
    if (gameObject1 === gameObject2) {
      throw new Error('Invalid collision.');
    }
    this.#gameObject1 = gameObject1;
    this.#gameObject2 = gameObject2;
    this.#resolutionVector = resolutionVector;
  }

  get gameObject1() {
    return this.#gameObject1;
  }

  get gameObject2() {
    return this.#gameObject2;
  }

  get resolutionVector() {
    return this.#resolutionVector;
  }
}

export { Collision };
