import _ from 'lodash';
import { AssetsManager } from '../assets';
import { BoxCollider } from '../engine/BoxCollider';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';

const SPEED = 5;

class Bird extends GameObject {
  #frameCount = 0;

  #sprite = AssetsManager.bird1;

  #offset = new Vector2D(0, _.random(-15, 15));

  activate() {
    this.setCollider(BoxCollider, [new Vector2D(this.#sprite.width, this.#sprite.height)]);
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    const basePosition = new Vector2D(
      frame.buffer.width + this.#sprite.width,
      frame.buffer.height - this.#sprite.height - 50,
    );
    this.#offset = this.#offset.setX(this.#offset.x - SPEED);
    this.#updateSprite();

    if (this.#offset.x < -(frame.buffer.width + 2 * this.#sprite.width)) {
      this.destroy(this);
    }
    this.position = basePosition.add(this.#offset);
    frame.buffer.draw(this.position, this.#sprite);
  }

  #updateSprite() {
    this.#frameCount += 1;
    if (this.#frameCount === 15) {
      this.#sprite = this.#sprite === AssetsManager.bird1 ? AssetsManager.bird2 : AssetsManager.bird1;
      this.#updateCollider();
      this.#frameCount = 0;
    }
  }

  #updateCollider() {
    /** @type {BoxCollider} */ (this.collider).box = new Vector2D(this.#sprite.width, this.#sprite.height);
  }
}

export { Bird };

/*
import _ from 'lodash';
import { AssetsManager } from '../assets';
import { BoxCollider } from '../engine/BoxCollider';
import { GameObject } from '../engine/GameObject';
import { Vector2D } from '../shared';

const SPEED = 5;
const ANIMATION_INTERVAL = 15;

class Bird extends GameObject {
  onActivate(buffer) {
    this.animation = new SpriteAnimation(ANIMATION_INTERVAL, [AssetsManager.bird1, AssetsManager.bird2]);
    this.transform.position = new Vector2D(
      buffer.width + this.animation.sprite.width,
      buffer.height - this.animation.sprite.height - 50,
    );
    this.transform.width = this.animation.sprite.width;
    this.transform.height = this.animation.sprite.height;
    this.rigidbody.addGravity().addVelocity(new Vector2D(-SPEED, 0));
    this.colliders.add(BoxCollider, [new Vector2D(this.animation.sprite.width, this.animation.sprite.height)]);
  }

  onUpdate() {
    if (this.transform.position.x < -this.animation.sprite.width) {
      this.destroy(this);
    }
  }
}

class Transform {

}

class Rigidbody {

}

class Animation {
  
}

export { Bird };

 */
