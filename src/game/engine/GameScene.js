/* eslint-disable class-methods-use-this */
import { Shape } from '../shared';
import { BoxCollider } from './BoxCollider';
import { CollisionDetector } from './CollisionDetector';
import { Rigidbody } from './Rigidbody';
import { Transform } from './Transform';

/** @typedef {'CREATED' | 'ACTIVE' | 'DESTROYED'} GameObjectStatus */

class GameScene {
  /** @type {import('./GameObject').GameObject[]} */
  #gameObjects = [];

  /** @type {Set<import('./GameObject').GameObject>} */
  #markedToDestroy = new Set();

  /** @type {import('./GameObject').GameObject[]} */
  #markedToActivate = [];

  #currentID = 0;

  #services;

  #collisionDetector = new CollisionDetector();

  #proxy = Object.freeze({
    createGameObject: this.createGameObject.bind(this),
    destroyGameObject: this.destroyGameObject.bind(this),
    attachCollider: (/** @type {import("./Collider").Collider} */ collider) => {
      this.#collisionDetector.add(collider);
    },
    detachCollider: (/** @type {import("./Collider").Collider} */ collider) => {
      this.#collisionDetector.remove(collider);
    },
  });

  /**
   * @param {import('./GameEngine').Services} services
   */
  constructor(services) {
    if (this.constructor === GameScene) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.#services = services;
  }

  activate() {
    throw new Error('Abstract method');
  }

  get services() {
    return this.#services;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  update(frame) {
    this.#collisionDetector.detectCollisions();
    this.#gameObjects.forEach((gameObject) => {
      gameObject.update(frame);
    });
    this.#updateActive();
    this.#debugColliders(frame.buffer);
    this.#updateDestroy();
  }

  destroy() {
    this.#updateActive();
    this.#gameObjects.forEach((x) => this.#markedToDestroy.add(x));
    this.#gameObjects = [];
    this.#updateDestroy();
    this.#currentID = 0;
    this.#markedToActivate = [];
    this.#markedToDestroy.clear();
    this.#collisionDetector.clear();
  }

  /**
   * @template {Record<string, any>} A
   * @template {import('./GameObject').GameObject<A>} R
   * @param {import('./GameObject').GameObjectConstructor<A, R>} Cls
   * @param {{ name?: string, args?: A }} params
   * @returns {R}
   */
  createGameObject(Cls, params = {}) {
    const args = /** @type {A} */ (params.args ?? {});
    const obj = new Cls({
      rigidbody: new Rigidbody(),
      transform: new Transform(),
      metadata: { id: this.#nextID(), name: params.name },
      scene: this.#proxy,
      services: this.#services,
      args,
    });
    this.#markedToActivate.push(obj);
    return obj;
  }

  /**
   * @param {import('./GameObject').GameObject} obj
   */
  destroyGameObject(obj) {
    if (!this.contains(obj)) {
      throw new Error(`Scene does not contains this GameObject ${obj}`);
    }
    this.#markedToDestroy.add(obj);
  }

  /**
   * @param {import('./GameObject').GameObject} gameObject
   * @returns {[true, GameObjectStatus] | [false]}
   */
  contains(gameObject) {
    if (this.#markedToActivate.includes(gameObject)) {
      return [true, 'CREATED'];
    }
    if (this.#markedToDestroy.has(gameObject)) {
      return [true, 'DESTROYED'];
    }
    if (this.#gameObjects.includes(gameObject)) {
      return [true, 'ACTIVE'];
    }
    return [false];
  }

  /**
   * @param {import('./CanvasBuffer').CanvasBuffer} buffer
   */
  #debugColliders(buffer) {
    this.#collisionDetector.colliders.forEach((collider) => {
      if (collider instanceof BoxCollider) {
        const path = new Path2D();
        path.rect(collider.position.x, collider.position.y, collider.box.x, collider.box.y);
        buffer.draw(collider.position, new Shape(path, undefined, 'red'));
      }
    });
  }

  #updateActive() {
    const markedToActivate = [...this.#markedToActivate];
    this.#markedToActivate = [];
    this.#gameObjects.push(...markedToActivate);
    markedToActivate.forEach((x) => x.activate());
  }

  #updateDestroy() {
    this.#gameObjects = this.#gameObjects.filter((x) => !this.#markedToDestroy.has(x));
    const markedToDestroy = [...this.#markedToDestroy.values()];
    this.#markedToDestroy.clear();
    markedToDestroy.forEach((x) => x.onDestroy());
  }

  #nextID() {
    return this.#currentID++;
  }
}

export { GameScene };
