import { Animation } from './Animation';
import { Rigidbody } from './Rigidbody';
import { Transform } from './Transform';

/**
 * @typedef {Readonly<{id: number, name?: string}>} GameObjectMetadata
 */

/**
 * @typedef {{
 *  createGameObject: import('./GameSceneManager').GameSceneManager['createGameObject'],
 *  destroyGameObject: import('./GameSceneManager').GameSceneManager['destroyGameObject'],
 *  attachCollider: (collider: import('./Collider').Collider) => void,
 *  detachCollider: (collider: import('./Collider').Collider) => void,
 * }} SceneProxy
 */

/**
 * @template {Record<string, any>} T
 * @typedef {Readonly<{metadata: GameObjectMetadata, scene: SceneProxy, services: import('../GameEngine').Services , args: T}>} GameObjectImplProps
 */

/**
 * @template {Record<string, any>} T
 * @template {import('../GameObject').GameObject<T>} R
 * @typedef {new (props: GameObjectImplProps<T>) => R} GameObjectConstructor
 */

/**
 * @template {Record<string, any>} T
 * @typedef {GameObjectImpl<T>['proxy']} GameObjectProxy
 */

/**
 * @template {Record<string, any>} [T={}]
 */
class GameObjectImpl {
  /**
   * @template {Record<string, any>} A
   * @template {import('../GameObject').GameObject<A>} R
   * @param {import('../GameObject').GameObjectConstructor<A, R>} Cls
   * @param {GameObjectImplProps<A>} props
   * @returns {{ impl: GameObjectImpl<A>, obj: R }}
   */
  static Create(Cls, props) {
    const impl = new GameObjectImpl(props);
    const obj = new Cls(impl.#proxy);
    impl.#obj = obj;
    return { impl, obj };
  }

  /**
   * @type {import('../GameObject').GameObject}
   */
  // @ts-ignore
  #obj;

  #scene;

  #metadata;

  #args;

  #proxy;

  #transform = new Transform();

  #rigidbody = new Rigidbody();

  #animation = new Animation();

  /**
   * @type {import('./Collider').Collider | undefined}
   */
  #collider;

  /**
   * @private
   * @param {GameObjectImplProps<T>} props
   */
  constructor({ metadata, scene, services, args }) {
    this.#metadata = metadata;
    this.#scene = scene;
    this.#args = args;
    const self = this;
    this.#proxy = Object.freeze({
      createGameObject: self.#scene.createGameObject.bind(self.#scene),
      destroyGameObject: self.#scene.destroyGameObject.bind(self.#scene),
      setCollider: self.setCollider.bind(self),
      ui: services.ui,
      keyboard: services.keyboard,
      id: metadata.id,
      rigidbody: self.#rigidbody,
      transform: self.#transform,
      animation: self.#animation,
      get collider() {
        return self.#collider;
      },
    });
  }

  get id() {
    return this.#metadata.id;
  }

  get proxy() {
    return this.#proxy;
  }

  /**
   * @template {unknown[]} R
   * @template {import('./Collider').ColliderConstructor<R>} C
   * @param {C} Cls
   * @param {R} args
   */
  setCollider(Cls, args) {
    const collider = new Cls(this.#obj, ...args);
    this.removeCollider();
    this.#collider = collider;
    this.#scene.attachCollider(collider);
  }

  removeCollider() {
    if (this.#collider) {
      this.#scene.detachCollider(this.#collider);
    }
  }

  activate() {
    this.#obj.onActivate(this.#args);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    this.#obj.onUpdate(frame);
    this.#rigidbody.update(this.#transform);
    this.#animation.update(frame.buffer, this.#transform.position);
  }

  destroy() {
    this.#obj.onDestroy();
    this.removeCollider();
  }
}

export { GameObjectImpl };
