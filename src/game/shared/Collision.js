class Collision {
  #gameObject1;

  #gameObject2;

  /**
   * @param {import('../engine/GameObject').GameObject} gameObject1
   * @param {import('../engine/GameObject').GameObject} gameObject2
   */
  constructor(gameObject1, gameObject2) {
    if (gameObject1 === gameObject2) {
      throw new Error('Invalid collision.');
    }
    this.#gameObject1 = gameObject1;
    this.#gameObject2 = gameObject2;
  }

  get gameObject1() {
    return this.#gameObject1;
  }

  get gameObject2() {
    return this.#gameObject2;
  }
}

export { Collision };
