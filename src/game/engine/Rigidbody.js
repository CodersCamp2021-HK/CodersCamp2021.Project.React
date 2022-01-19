class Rigidbody {
  addGravity() {
    this.gravity = true;
  }

  /**
   * @param { import('../shared/Vector2D').Vector2D } v
   */
  addVelocity(v) {
    this.velocity = true;
    this.velocityVector = v;
  }

  /**
   * @param { import('../shared/Vector2D').Vector2D } v
   */
  addAcceleration(v) {
    this.acceleration = true;
    this.accelerationVector = v;
  }

  /**
   * @param { import('./Transform').Transform } transform
   */
  update(transform) {
    if (this.gravity) transform.gravity();
    // @ts-ignore
    if (this.velocity) transform.velocity(this.velocityVector);
    // @ts-ignore
    if (this.acceleration) transform.acceleration(this.accelerationVector);
    transform.setPosition();
  }
}

export { Rigidbody };
