import { Vector } from '../../shared';
import { GameObject, BoxCollider } from '../../engine';
import { KING_ATTACK_DELAY, KING_MAX_HP } from '../../config';
import { KingAttack } from './KingAttack';
import { KingDead } from './KingDead';
import { KingDoorIn } from './KingDoorIn';
import { KingDoorOut } from './KingDoorOut';
import { KingFall } from './KingFall';
import { KingGround } from './KingGround';
import { KingHit } from './KingHit';
import { KingIdle } from './KingIdle';
import { KingJump } from './KingJump';
import { KingRunLeft } from './KingRunLeft';
import { KingRunRight } from './KingRunRight';
import { Door } from '../Door';
// eslint-disable-next-line import/no-cycle
import { SolidTile } from '../SolidTile';
import { PigSwing } from '../Pig/PigSwing';
import { HeartList } from '../HeartList';

/**
 * @typedef {'attack' | 'collision' | 'dead' | 'doorIn' | 'doorOut' | 'fall' | 'ground' | 'hit' | 'idle' | 'jump' | 'runLeft' | 'runRight' } KingStateKey
 */

class King extends GameObject {
  /**
   * @type {import('./KingState').KingState | undefined}
   */
  #state;

  #isOnGround = false;

  #canAttack = true;

  #hp = KING_MAX_HP;

  #heartList = this.create(HeartList);

  get isOnGround() {
    return this.#isOnGround;
  }

  get canAttack() {
    return this.#canAttack;
  }

  get hp() {
    return this.#hp;
  }

  #damage() {
    if (!(this.#state instanceof KingHit || this.#state instanceof KingDead)) {
      this.#hp -= 1;
      this.transitionState('hit');
    }
  }

  delayAttack() {
    this.#canAttack = false;
    setTimeout(() => {
      this.#canAttack = true;
    }, KING_ATTACK_DELAY);
  }

  flipRight() {
    this.animation.flipped = false;
    this.setCollider(BoxCollider, [new Vector(15, 26), new Vector(24, 20)]);
  }

  flipLeft() {
    this.animation.flipped = true;
    this.setCollider(BoxCollider, [new Vector(15, 26), new Vector(38, 20)]);
  }

  /**
   * @param {Object} props
   * @param {Vector} props.position
   */
  onActivate({ position }) {
    this.#state = new KingDoorOut(this);
    this.rigidbody.addGravity();

    const width = this.animation.sprite?.width ?? 0;
    const height = this.animation.sprite?.height ?? 0;
    this.transform.origin = position.add(new Vector(width / 3, 13));
    this.transform.width = width;
    this.transform.height = height;
    this.setCollider(BoxCollider, [new Vector(15, 26), new Vector(24, 20)]);
    this.#heartList.createHeartList(this.#hp);
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  onUpdate(frame) {
    this.#state?.update(frame);
    this.#isOnGround = false;
    this.#heartList.destroy(this.#heartList);
    this.#heartList.createHeartList(this.#hp);
  }

  /**
   * @param {import('../../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {
    if (target instanceof SolidTile && collision.resolutionVector.y < 0) {
      this.#isOnGround = true;
    } else if (target instanceof Door && !(this.#state instanceof KingDoorIn)) {
      target.open();
      this.transitionState('doorIn');
    } else if (
      target instanceof PigSwing &&
      ![KingDoorIn, KingHit, KingDead].some((state) => this.#state instanceof state)
    ) {
      this.#damage();
      // this.destroy(Heart) coś takiego myślałem, zeby tutaj moze niszczyc ten obraz z sercem, ale nie wiem jak to wywołać
    }
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

      case 'hit': {
        this.#state = new KingHit(this);
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

export { King };
