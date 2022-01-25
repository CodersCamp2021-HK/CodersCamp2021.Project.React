/* eslint-disable class-methods-use-this */
import { CollisionDetector } from './CollisionDetector';
import { GameObjectImpl } from './GameObjectImpl';

/**
 * @typedef {Readonly<{
 *  createGameObject: GameSceneManager['createGameObject'],
 *  destroyGameObject: GameSceneManager['destroyGameObject']
 * }>} GameSceneProxy
 */

/** @typedef {'CREATED' | 'ACTIVE' | 'DESTROYED'} GameObjectStatus */

class GameSceneManager {
  /** @type {import('./GameObjectImpl').GameObjectImpl[]} */
  #gameObjects = [];

  /** @type {Set<import('./GameObjectImpl').GameObjectImpl>} */
  #markedToDestroy = new Set();

  /** @type {import('./GameObjectImpl').GameObjectImpl[]} */
  #markedToActivate = [];

  #currentID = 0;

  #services;

  /** @type {import('../GameScene').GameScene | undefined} */
  #scene;

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

  get proxy() {
    return this.#proxy;
  }

  /**
   * @param {import('../GameEngine').Services} services
   */
  constructor(services) {
    this.#services = services;
  }

  /**
   * @param {typeof import('../GameScene').GameScene} Scene
   */
  load(Scene) {
    this.#destroy();
    this.#scene = new Scene(this);
    this.#scene.onActivate();
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (!this.#scene) {
      return;
    }

    this.#gameObjects.forEach((gameObject) => {
      gameObject.update(frame);
    });
    this.#collisionDetector.detectCollisions();
    this.#updateActive();
    this.#DEBUG_Colliders(/** @type {import('./CanvasBuffer').CanvasBuffer} */ (frame.buffer));
    this.#updateDestroy();
  }

  /**
   * @template {Record<string, any>} A
   * @template {import('../GameObject').GameObject<A>} R
   * @param {import('../GameObject').GameObjectConstructor<A, R>} Cls
   * @param {{ name?: string, args?: A }} params
   * @returns {R}
   */
  createGameObject(Cls, params = {}) {
    const args = /** @type {A} */ (params.args ?? {});
    const { impl, obj } = GameObjectImpl.Create(Cls, {
      metadata: { id: this.#nextID(), name: params.name },
      scene: this.#proxy,
      services: this.#services,
      args,
    });
    this.#markedToActivate.push(impl);
    return obj;
  }

  /**
   * @param {import('../GameObject').GameObject} obj
   */
  destroyGameObject(obj) {
    const impl = this.#findById(obj.id);
    if (!impl) return;
    this.#markedToDestroy.add(impl);
  }

  /**
   * @param {number} id
   */
  #findById(id) {
    return this.#gameObjects.find((x) => x.id === id);
  }

  #destroy() {
    this.#scene?.onDestroy();
    this.#updateActive();
    this.#gameObjects.forEach((x) => this.#markedToDestroy.add(x));
    this.#gameObjects = [];
    this.#updateDestroy();
    this.#currentID = 0;
    this.#markedToActivate = [];
    this.#markedToDestroy.clear();
    this.#collisionDetector.clear();
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
    markedToDestroy.forEach((x) => x.destroy());
  }

  #nextID() {
    return this.#currentID++;
  }

  /**
   * @param {import('./CanvasBuffer').CanvasBuffer} buffer
   */
  #DEBUG_Colliders(buffer) {
    this.#collisionDetector.colliders.forEach((collider) => {
      collider.DEBUG_Draw(buffer);
    });
  }
}

export { GameSceneManager };
