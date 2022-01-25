import { Vector } from '../../shared';
import { GameObject, BoxCollider } from '../../engine';
import { KingAttack } from './KingAttack';
import { KingDead } from './KingDead';
import { KingDoorIn } from './KingDoorIn';
import { KingDoorOut } from './KingDoorOut';
import { KingFall } from './KingFall';
import { KingGround } from './KingGround';
import { KingIdle } from './KingIdle';
import { KingJump } from './KingJump';
import { KingRunLeft } from './KingRunLeft';
import { KingRunRight } from './KingRunRight';
import { SolidTile } from '..';

/**
 * @typedef {'attack' | 'collision' | 'dead' | 'doorIn' | 'doorOut' | 'fall' | 'ground' | 'idle' | 'jump' | 'runLeft' | 'runRight' } KingStateKey
 */

class KingStatefull extends GameObject {
  /**
   * @type {import('./KingState').KingState | undefined}
   */
  #state;

  /**
   * @type {boolean}
   */
  #isOnGround = false;

  get isOnGround() {
    return this.#isOnGround;
  }

  /**
   * @param {Object} props
   * @param {Vector} props.position
   */
  onActivate({ position }) {
    this.rigidbody.addGravity();
    this.setCollider(BoxCollider, [new Vector(0, 0)]);
    this.position = position;
    this.#state = new KingDoorIn(this);
    this.transform.origin = new Vector(
      // @ts-ignore
      this.position.x + this.animation.sprite.width,
      // @ts-ignore
      this.position.y + this.animation.sprite.height,
    );
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  onUpdate(frame) {
    this.#state?.update(frame);
    this.#isOnGround = false;
  }

  /**
   * @param {import('../../shared').Collision} _collision
   * @param {GameObject} target
   */
  onCollision(_collision, target) {
    if (target instanceof SolidTile) {
      const kingLines = /** @type {BoxCollider} */ (this.collider).lines;
      const boxLines = /** @type {BoxCollider} */ (target.collider).lines;
      const fromBoxToKing = this.transform.origin.subtract(target.transform.origin);

      const xOverlap = Math.min(kingLines[0][1], boxLines[0][1]) - Math.max(kingLines[0][0], boxLines[0][0]);
      const yOverlap = Math.min(kingLines[1][1], boxLines[1][1]) - Math.max(kingLines[1][0], boxLines[1][0]);

      if (xOverlap + 0.11 < yOverlap) {
        const resolutionOffset = new Vector(Math.sign(fromBoxToKing.x) * xOverlap, 0);
        this.transform.position = this.transform.position.add(resolutionOffset);
        this.rigidbody.velocity = this.rigidbody.velocity.setX(0);
      } else {
        if (Math.sign(fromBoxToKing.y) === -1) {
          this.#isOnGround = true;
        }
        const resolutionOffset = new Vector(0, Math.sign(fromBoxToKing.y) * yOverlap);
        this.transform.position = this.transform.position.add(resolutionOffset);
        this.rigidbody.velocity = this.rigidbody.velocity.setY(0);
      }
    }
    // this.ui.setLose();
    // this.transitionState('collision');
  }

  /**
   * @param {KingStateKey} key
   */
  transitionState(key) {
    switch (key) {
      case 'attack': {
        this.#state = new KingAttack(this);
        break;
      }

      case 'dead': {
        this.#state = new KingDead(this);
        break;
      }

      case 'doorIn': {
        this.#state = new KingDoorIn(this);
        break;
      }

      case 'doorOut': {
        this.#state = new KingDoorOut(this);
        break;
      }

      case 'fall': {
        this.#state = new KingFall(this);
        break;
      }

      case 'ground': {
        this.#state = new KingGround(this);
        break;
      }

      case 'idle': {
        this.#state = new KingIdle(this);
        break;
      }

      case 'jump': {
        this.#state = new KingJump(this);
        break;
      }

      case 'runLeft': {
        this.#state = new KingRunLeft(this);
        break;
      }

      case 'runRight': {
        this.#state = new KingRunRight(this);
        break;
      }

      default: {
        this.#state = undefined;
      }
    }
    return this;
  }
}

export { KingStatefull };
