/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * @typedef {Readonly<{id: number, name?: string}>} GameObjectMetadata
 */

/**
 * @template {Record<string, any>} T
 * @typedef {Readonly<{metadata: GameObjectMetadata, scene: import('./GameScene').GameScene, args: T}>} GameObjectProps
 */

/**
 * @template {Record<string, any>} [T={}]
 * @typedef {new (props: GameObjectProps<T>) => GameObject<T>} GameObjectConstructor
 */

/**
 * @template {Record<string, any>} [T={}]
 */
class GameObject {
  #props;

  /**
   * @param {GameObjectProps<T>} props
   */
  constructor(props) {
    if (this.constructor === GameObject) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.#props = props;
  }

  /**
   * @template {Record<string, any>} R
   * @template {GameObjectConstructor<R>} C
   * @param {C} cls
   * @param {{ name?: string, args?: R }} params
   * @returns {GameObject<R>}
   */
  create(cls, params = {}) {
    return this.#props.scene.createGameObject(cls, params);
  }

  /**
   * @param {GameObject} obj
   */
  destroy(obj) {
    this.#props.scene.destroyGameObject(obj);
  }

  get name() {
    return this.#props.metadata.name;
  }

  get id() {
    return this.#props.metadata.id;
  }

  /**
   * @param {keyof T} name
   */
  getArg(name) {
    return this.#props.args[name];
  }

  update(/** @type {import('../shared/Frame').Frame} */ frame) {
    throw new Error('Abstract method');
  }
}

export { GameObject };
