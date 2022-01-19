import _ from 'lodash';
import { AssetsManager } from '../assets';
import { BoxCollider } from '../engine/BoxCollider';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';
import { Animation } from '../engine/Animation';

const SPEED_X = -2;
const SPEED_Y = 0;
const ACCELERATION_X = -0.1;
const ACCELERATION_Y = 0;
const ANIMATION_INTERVAL = 15;

class Bird extends GameObject {
  /**
   * @type {Animation}
   */
  animation;

  activate() {
    this.animation = new Animation(ANIMATION_INTERVAL, [AssetsManager.bird1, AssetsManager.bird2]);
    this.rigidbody.addGravity();
    this.rigidbody.addVelocity(new Vector2D(SPEED_X, SPEED_Y));
    this.rigidbody.addAcceleration(new Vector2D(ACCELERATION_X, ACCELERATION_Y));
    // this.setCollider(BoxCollider, [new Vector2D(this.animation.sprite.width, this.animation.sprite.height)]);
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    this.transform.position = new Vector2D(
      frame.buffer.width + this.animation.sprite.width,
      frame.buffer.height - this.animation.sprite.height - 50,
    );
    this.transform.width = this.animation.sprite.width;
    this.transform.height = this.animation.sprite.height;
    this.rigidbody.update(this.transform);
    this.animation.update(frame.buffer, this.transform.position);
    if (this.transform.position.x < -this.animation.sprite.width) {
      this.destroy(this);
    }
  }
}

export { Bird };
