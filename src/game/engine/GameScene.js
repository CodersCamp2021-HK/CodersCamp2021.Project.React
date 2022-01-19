/* eslint-disable class-methods-use-this */
class GameScene {
  // #region interface

  /**
   * @abstract
   */
  onActivate() {}

  /**
   * @abstract
   */
  onDestroy() {}

  // #endregion

  // #region implementation

  #proxy;

  /**
   * @param {import('./internals/GameSceneManager').GameSceneProxy} proxy
   */
  constructor(proxy) {
    if (this.constructor === GameScene) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.#proxy = proxy;
  }

  /**
   * @template {Record<string, any>} A
   * @template {import('./GameObject').GameObject<A>} R
   * @param {import('./GameObject').GameObjectConstructor<A, R>} Cls
   * @param {{ name?: string, args?: A }} params
   * @returns {R}
   */
  create(Cls, params = {}) {
    return this.#proxy.createGameObject(Cls, params);
  }

  /**
   * @param {import("./GameObject").GameObject} obj
   */
  destroy(obj) {
    return this.#proxy.destroyGameObject(obj);
  }

  // #endregion
}

export { GameScene };
