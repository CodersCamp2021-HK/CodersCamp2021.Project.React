class CollisionDetector {
  /**
   * @type {import('./Collider').Collider[]}
   */
  #colliders = [];

  /**
   * @type {import('./Collider').Collider[]}
   */
  #noTileColliders = [];

  clear() {
    this.#colliders = [];
    this.#noTileColliders = [];
  }

  get colliders() {
    return this.#colliders;
  }

  /**
   * @param {import('./Collider').Collider} collider
   */
  add(collider) {
    this.#colliders.push(collider);
    if (!collider.gameObject.isSolidTile) {
      this.#noTileColliders.push(collider);
    }
  }

  /**
   * @param {import('./Collider').Collider} collider
   */
  remove(collider) {
    const idx = this.#colliders.findIndex((x) => x === collider);
    if (idx === -1) return;
    this.#colliders.splice(idx, 1);

    const noTileIdx = this.#noTileColliders.findIndex((x) => x === collider);
    if (noTileIdx === -1) return;
    this.#noTileColliders.splice(noTileIdx, 1);
  }

  detectCollisions() {
    /** @type {import('../../shared').Collision[]} */
    const collisions = [];
    this.#noTileColliders.forEach((collider1) => {
      this.#colliders.forEach((collider2) => {
        if (collider1 !== collider2) {
          const collision1 = collider1.hasCollisionWith(collider2);
          const collision2 = collider2.hasCollisionWith(collider1);

          if (collision1) {
            collisions.push(collision1);
          }

          if (collision2) {
            collisions.push(collision2);
          }
        }
      });
    });

    collisions.forEach((collision) => {
      collision.gameObject1.onCollision(collision, collision.gameObject2);
    });
  }
}

export { CollisionDetector };
