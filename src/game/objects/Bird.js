import { AssetsManager } from '../assets';
import { BoxCollider, GameObject } from '../engine';
import { Vector } from '../shared';

const SPEED_X = -2;
const SPEED_Y = 0;
const ACCELERATION_X = -0.2;
const ACCELERATION_Y = 0;
const ANIMATION_INTERVAL = 15;

class Bird extends GameObject {
  onActivate() {
    this.animation.reset(ANIMATION_INTERVAL, [AssetsManager.bird1, AssetsManager.bird2]);
    this.transform.origin = new Vector(512 + this.sprite.width, 512 - this.sprite.height - 50);
    this.transform.width = this.sprite.width;
    this.transform.height = this.sprite.height;
    this.rigidbody.addGravity();
    this.rigidbody.addVelocity(new Vector(SPEED_X, SPEED_Y));
    this.rigidbody.addAcceleration(new Vector(ACCELERATION_X, ACCELERATION_Y));
    this.setCollider(BoxCollider, [new Vector(this.sprite.width, this.sprite.height)]);
  }

  get sprite() {
    return /** @type {import('../shared').Sprite} */ (this.animation.sprite);
  }

  onUpdate() {
    if (this.transform.position.x < -this.sprite.width) {
      this.destroy(this);
    }
  }
}

export { Bird };
