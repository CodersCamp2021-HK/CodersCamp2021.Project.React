class CollisionDetector {
  /**
   * @type {import('./Collider').Collider[]}
   */
  #colliders = [];

  clear() {
    this.#colliders = [];
  }

  get colliders() {
    return this.#colliders;
  }

  /**
   * @param {import('./Collider').Collider} collider
   */
  add(collider) {
    this.#colliders.push(collider);
  }

  /**
   * @param {import('./Collider').Collider} collider
   */
  remove(collider) {
    const idx = this.#colliders.findIndex((x) => x === collider);
    if (idx === -1) return;
    this.#colliders.splice(idx, 1);
  }

  detectCollisions() {
    this.#colliders.forEach((collider1) => {
      this.#colliders.forEach((collider2) => {
        if (collider1 !== collider2) {
          const collision = collider1.hasCollisionWith(collider2);

          if (collision) {
            collision.gameObject1.onCollision(collision, collision.gameObject2);
          }
        }
      });
    });
  }
}

export { CollisionDetector };
