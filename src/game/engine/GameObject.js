/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { Vector2D } from '../shared';
import { Rigidbody } from './Rigidbody';
import { Transform } from './Transform';

/**
 * @template {unknown[]} T
 * @typedef {new (gameObject: GameObject, ...rest: T) => import('./Collider').Collider} ColliderConstructor
 */

/**
 * @typedef {Readonly<{id: number, name?: string}>} GameObjectMetadata
 */

/**
 * @typedef {{
 *  createGameObject: import('./GameScene').GameScene['createGameObject'],
 *  destroyGameObject: import('./GameScene').GameScene['destroyGameObject'],
 *  attachCollider: (collider: import('./Collider').Collider) => void,
 *  detachCollider: (collider: import('./Collider').Collider) => void,
 * }} SceneProxy
 */

/**
 * @template {Record<string, any>} T
 * @typedef {Readonly<{rigidbody: Rigidbody, transform: Transform, metadata: GameObjectMetadata, scene: SceneProxy, services: import('./GameEngine').Services , args: T}>} GameObjectProps
 */

/**
 * @template {Record<string, any>} T
 * @template {GameObject<T>} R
 * @typedef {new (props: GameObjectProps<T>) => R} GameObjectConstructor
 */

/**
 * @template {Record<string, any>} [T={}]
 */
class GameObject {
  #scene;

  #metadata;

  #services;

  #args;

  position = Vector2D.Zero;

  /**
   * @type {import('./Collider').Collider | undefined}
   */
  #collider;

  /**
   * @param {GameObjectProps<T>} props
   */
  constructor({ rigidbody, transform, metadata, scene, services, args }) {
    if (this.constructor === GameObject) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.rigidbody = rigidbody;
    this.transform = transform;
    this.#metadata = metadata;
    this.#scene = scene;
    this.#services = services;
    this.#args = args;
  }

  /**
   * @template {unknown[]} R
   * @template {ColliderConstructor<R>} C
   * @param {C} Cls
   * @param {R} args
   */
  setCollider(Cls, args) {
    const collider = new Cls(this, ...args);
    this.removeCollider();
    this.#collider = collider;
    this.#scene.attachCollider(collider);
  }

  get collider() {
    return this.#collider;
  }

  removeCollider() {
    if (this.#collider) {
      this.#scene.detachCollider(this.#collider);
    }
  }

  /**
   * @template {Record<string, any>} A
   * @template {GameObject<A>} R
   * @param {GameObjectConstructor<A, R>} Cls
   * @param {{ name?: string, args?: A }} params
   * @returns {R}
   */
  create(Cls, params = {}) {
    return this.#scene.createGameObject(Cls, params);
  }

  /**
   * @param {GameObject} obj
   */
  destroy(obj) {
    this.#scene.destroyGameObject(obj);
  }

  get name() {
    return this.#metadata.name;
  }

  get id() {
    return this.#metadata.id;
  }

  get keyboard() {
    return this.#services.keyboard;
  }

  get ui() {
    return this.#services.ui;
  }

  /**
   * @param {keyof T} name
   */
  getArg(name) {
    return this.#args[name];
  }

  activate() {}

  /**
   * @param {import('../shared').Frame} frame
   */

  update(frame) {
    this.rigidbody.update(this.transform);
  }

  onDestroy() {
    this.removeCollider();
  }

  /**
   * @param {import('../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {}
}

export { GameObject };
