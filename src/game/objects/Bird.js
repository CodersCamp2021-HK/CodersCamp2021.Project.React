import { AssetsManager } from '../assets';
import { BoxCollider, GameObject } from '../engine';
import { Vector } from '../shared';

const SPEED_X = -0.02;
const SPEED_Y = 0;
const ACCELERATION_X = -0.01;
const ACCELERATION_Y = 0;
const ANIMATION_INTERVAL = 15;

class Bird extends GameObject {
  onActivate() {
    this.animation.reset(ANIMATION_INTERVAL, [AssetsManager.bird1, AssetsManager.bird2]);
    this.rigidbody.addGravity();
    this.rigidbody.addVelocity(new Vector(SPEED_X, SPEED_Y));
    this.rigidbody.addAcceleration(new Vector(ACCELERATION_X, ACCELERATION_Y));
    this.setCollider(BoxCollider, [new Vector(this.sprite.width, this.sprite.height)]);
  }

  get sprite() {
    return /** @type {import('../shared').Sprite} */ (this.animation.sprite);
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    this.transform.position = new Vector(
      frame.buffer.width + this.sprite.width,
      frame.buffer.height - this.sprite.height - 50,
    );
    this.transform.width = this.sprite.width;
    this.transform.height = this.sprite.height;
    this.rigidbody.update(this.transform);
    this.animation.update(frame.buffer, this.transform.position);
    if (this.transform.position.x < -this.sprite.width) {
      this.destroy(this);
    }
  }
}

export { Bird };
