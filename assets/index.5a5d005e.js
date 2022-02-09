import { _, r as react, j as jsx, c as css, G as Global, a as jsxs, R as ReactDOM, L as Link, b as React, u as useParams, d as useNavigate, N as Navigate, F as Fragment, e as Routes, f as Route, B as BrowserRouter } from './vendor.6ecb0759.js';

const p = function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
            fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
            fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (script.crossorigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
};true&&p();

class Collision {
  #gameObject1;

  #gameObject2;

  #resolutionVector;

  /**
   * @param {import('../engine').GameObject} gameObject1
   * @param {import('../engine').GameObject} gameObject2
   * @param {import('./Vector').Vector} resolutionVector
   */
  constructor(gameObject1, gameObject2, resolutionVector) {
    if (gameObject1 === gameObject2) {
      throw new Error('Invalid collision.');
    }
    this.#gameObject1 = gameObject1;
    this.#gameObject2 = gameObject2;
    this.#resolutionVector = resolutionVector;
  }

  get gameObject1() {
    return this.#gameObject1;
  }

  get gameObject2() {
    return this.#gameObject2;
  }

  get resolutionVector() {
    return this.#resolutionVector;
  }
}

class Crop {
  #origin;

  #width;

  #height;

  /**
   * @param {import('./Vector').Vector} origin
   * @param {number} width
   * @param {number} height
   */
  constructor(origin, width, height) {
    this.#origin = origin;
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get origin() {
    return this.#origin;
  }

  /**
   * @param {number} width
   */
  setWidth(width) {
    return new Crop(this.#origin, width, this.#height);
  }

  /**
   * @param {number} height
   */
  setHeight(height) {
    return new Crop(this.#origin, this.#width, height);
  }

  /**
   * @param {import('./Vector').Vector} origin
   */
  setOrigin(origin) {
    return new Crop(origin, this.#width, this.#height);
  }
}

/**
 * @typedef {{get width(): number; get height(): number; draw(position: import('./Vector').Vector, sprite: import('./Sprite').Sprite | import('./Shape').Shape): void}} Buffer
 */

class Frame {
  #frameID;

  #buffer;

  #elapsed;

  /**
   * @param {number} frameID
   * @param {Buffer} buffer
   * @param {number} elapsed
   */
  constructor(frameID, buffer, elapsed) {
    this.#frameID = frameID;
    this.#buffer = buffer;
    this.#elapsed = elapsed;
  }

  get ID() {
    return this.#frameID;
  }

  get buffer() {
    return this.#buffer;
  }

  get elapsed() {
    return this.#elapsed;
  }
}

class Sprite {
  #imgUrl;

  #crop;

  #scale;

  #width;

  #height;

  #flipped;

  /**
   *
   * @param {string} imgUrl
   * @param {import('./Crop').Crop} crop
   * @param {number | undefined} scale
   * @param {boolean} flipped
   */
  constructor(imgUrl, crop, scale = undefined, flipped = false) {
    this.#imgUrl = imgUrl;
    this.#crop = crop;
    this.#scale = scale ?? 1;
    this.#width = crop.width * this.#scale;
    this.#height = crop.height * this.#scale;
    this.#flipped = flipped;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get crop() {
    return this.#crop;
  }

  /**
   * @param {import("./Crop").Crop} crop
   */
  setCrop(crop) {
    return new Sprite(this.imgUrl, crop, this.#scale);
  }

  get imgUrl() {
    return this.#imgUrl;
  }

  get flipped() {
    return this.#flipped;
  }

  flip() {
    return new Sprite(this.#imgUrl, this.#crop, this.#scale, !this.#flipped);
  }
}

class Vector {
  #x;

  #y;

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  /**
   * @param {number} x
   */
  setX(x) {
    return new Vector(x, this.y);
  }

  /**
   * @param {number} y
   */
  setY(y) {
    return new Vector(this.x, y);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  static get Zero() {
    return new Vector(0, 0);
  }

  /**
   * @param {Vector} v
   */
  equals(v) {
    return this.x === v.x && this.y === v.y;
  }

  /**
   * @param {Vector} v
   */
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /**
   * @param {Vector} v
   */
  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * @param {number} s
   */
  scale(s) {
    return new Vector(this.x * s, this.y * s);
  }

  /**
   * @param {Vector} v
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  normalized() {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2);
    return length === 0 ? Vector.Zero : new Vector(this.x / length, this.y / length);
  }

  /**
   * @param {Vector} v
   */
  distanceSquaredTo(v) {
    return (this.x - v.x) ** 2 + (this.y - v.y) ** 2;
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * @template {unknown[]} T
 * @typedef {new (gameObject: import('../GameObject').GameObject, ...rest: T) => import('./Collider').Collider} ColliderConstructor
 */

class Collider {
  // #region interface

  /**
   * @abstract
   * @param {Collider} collider
   * @returns {import('../../shared').Collision?}
   */
  hasCollisionWith(collider) {
    throw new Error('Abstract method');
  }

  // #endregion

  // #region implementation
  #gameObject;

  /**
   * @param {import('../GameObject').GameObject} gameObject
   */
  constructor(gameObject) {
    if (this.constructor === Collider) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.#gameObject = gameObject;
  }

  get gameObject() {
    return this.#gameObject;
  }
  // #endregion
}

class BoxCollider extends Collider {
  dimensions;

  offset;

  /**
   * @param {import('./GameObject').GameObject} gameObject
   * @param {import('../shared').Vector} dimensions
   * @param {import('../shared').Vector?} offset
   */
  constructor(gameObject, dimensions, offset) {
    super(gameObject);
    this.dimensions = dimensions;
    this.offset = offset ?? Vector.Zero;
  }

  /**
   * @returns {[import('../shared').Vector, import('../shared').Vector, import('../shared').Vector, import('../shared').Vector]}
   */
  get points() {
    const vx = new Vector(this.dimensions.x, 0);
    const vy = new Vector(0, this.dimensions.y);
    return [this.topLeft, this.topLeft.add(vx), this.topLeft.add(vy), this.bottomRight];
  }

  get topLeft() {
    return this.gameObject.position.add(this.offset);
  }

  get bottomRight() {
    return this.topLeft.add(this.dimensions);
  }

  get center() {
    return this.topLeft.add(this.bottomRight).scale(0.5);
  }

  /**
   * @param {BoxCollider} boxCollider
   * @returns {Collision?}
   */
  #hasCollisionWithBox(boxCollider) {
    // Source: http://blog.meltinglogic.com/2015/04/aabb-overlapping-area/
    const overlap = new Vector(
      Math.min(this.bottomRight.x, boxCollider.bottomRight.x) - Math.max(this.topLeft.x, boxCollider.topLeft.x),
      Math.min(this.bottomRight.y, boxCollider.bottomRight.y) - Math.max(this.topLeft.y, boxCollider.topLeft.y),
    );

    if (overlap.x > 0 && overlap.y > 0) {
      const fromBoxToSelf = this.center.subtract(boxCollider.center);

      const resolutionVector =
        overlap.x < overlap.y
          ? new Vector(Math.sign(fromBoxToSelf.x) * overlap.x, 0)
          : new Vector(0, Math.sign(fromBoxToSelf.y) * overlap.y);

      return new Collision(this.gameObject, boxCollider.gameObject, resolutionVector);
    }

    return null;
  }

  /**
   * @param {Collider} collider
   * @returns {Collision?}
   */
  hasCollisionWith(collider) {
    if (collider instanceof BoxCollider) {
      return this.#hasCollisionWithBox(collider);
    }

    throw new Error('Not supported collision detection.');
  }
}

class CanvasBuffer {
  #canvas;

  #ctx;

  /** @type {Map<string, HTMLImageElement>} */
  #imageCache;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.#canvas = document.createElement('canvas');
    this.#canvas.width = canvas.width;
    this.#canvas.height = canvas.height;
    const ctx = this.#canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      throw new Error('Canvas 2D context is needed');
    }
    this.#ctx = ctx;
    this.#imageCache = new Map();
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.fillStyle = '#FFFFFF';
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.fill();
  }

  get width() {
    return this.#canvas.width;
  }

  get height() {
    return this.#canvas.height;
  }

  get canvas() {
    return this.#canvas;
  }

  /**
   *
   * @param {import('../../shared').Vector} position
   * @param {Sprite | import('../../shared').Shape} sprite
   */
  draw(position, sprite) {
    if (sprite instanceof Sprite) {
      const img = this.#getImg(sprite.imgUrl);

      this.#ctx.save();
      this.#ctx.setTransform(
        sprite.flipped ? -1 : 1, // scaleX
        0, // skewY
        0, // skewX
        1, // scaleY
        position.x + (sprite.flipped ? sprite.width : 0), // posX
        position.y, // posY
      );
      this.#ctx.drawImage(
        img,
        sprite.crop.origin.x,
        sprite.crop.origin.y,
        sprite.crop.width,
        sprite.crop.height,
        0,
        0,
        sprite.width,
        sprite.height,
      );
      this.#ctx.restore();
    } else {
      const shape = sprite;
      if (shape.fill) {
        const tmp = this.#ctx.fillStyle;
        this.#ctx.fillStyle = shape.fill;
        this.#ctx.fill(shape.path);
        this.#ctx.fillStyle = tmp;
      }
      if (shape.stroke) {
        const tmp = this.#ctx.strokeStyle;
        this.#ctx.strokeStyle = shape.stroke;
        this.#ctx.stroke(shape.path);
        this.#ctx.strokeStyle = tmp;
      }
    }
  }

  /**
   * @param {string} url
   */
  #getImg(url) {
    const maybeImg = this.#imageCache.get(url);
    if (maybeImg) {
      return maybeImg;
    }
    const img = new Image();
    img.src = url;
    this.#imageCache.set(url, img);
    return img;
  }
}

class CanvasDisplay {
  #canvas;

  #ctx;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.#canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      throw new Error('Canvas 2D context is needed');
    }
    this.#ctx = ctx;
  }

  /**
   * @param {import("./CanvasBuffer").CanvasBuffer} buffer
   */
  flush(buffer) {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.drawImage(buffer.canvas, 0, 0);
  }
}

/** @typedef {'created' | 'running' | 'stopped' | 'error'} GameLoopState */
/** @typedef {(frame: Frame) => void} OnFrame */
class GameLoop {
  #buffer;

  #display;

  /** @type {number | undefined} */
  #rafID;

  /** @type {number | undefined} */
  #prevTimestamp;

  /** @type {GameLoopState} */
  #state = 'created';

  #frameID = 0;

  #onFrame;

  /**
   * @param {import('./CanvasDisplay').CanvasDisplay} display
   * @param {import('./CanvasBuffer').CanvasBuffer} buffer
   * @param {OnFrame} fn
   */
  constructor(display, buffer, fn) {
    this.#display = display;
    this.#buffer = buffer;
    this.#onFrame = fn;
  }

  start() {
    if (this.#state === 'running') {
      return;
    }
    this.#state = 'running';
    this.#update(0);
    this.#rafID = this.#raf();
  }

  stop() {
    if (this.#state === 'stopped') {
      return;
    }
    this.#state = 'stopped';
    if (this.#rafID) {
      cancelAnimationFrame(this.#rafID);
      this.#rafID = undefined;
    }
  }

  reset() {
    if (this.#state === 'created') {
      return;
    }
    this.stop();
    this.#state = 'created';
    this.#frameID = 0;
  }

  #update(/** @type {number} */ timestamp) {
    try {
      if (this.#prevTimestamp === undefined) {
        this.#prevTimestamp = timestamp;
      }

      const elapsed = timestamp - this.#prevTimestamp;
      this.#prevTimestamp = timestamp;
      this.#buffer.clear();
      const frame = new Frame(this.#frameID++, this.#buffer, elapsed);
      this.#onFrame(frame);
    } catch (e) {
      this.stop();
      this.#state = 'error';
      throw e;
    }
  }

  #raf() {
    return requestAnimationFrame(this.#loop.bind(this));
  }

  #loop(/** @type {number} */ timestamp) {
    if (this.#state !== 'running') {
      return;
    }

    if (this.#buffer) {
      this.#display.flush(this.#buffer);
    }
    this.#rafID = this.#raf();
    this.#update(timestamp);
  }

  get state() {
    return this.#state;
  }
}

class CollisionDetector {
  /**
   * @type {import('./Collider').Collider[]}
   */
  #colliders = [];

  /**
   * @type {import('./Collider').Collider[]}
   */
  #noTileColliders = [];

  clear() {
    this.#colliders = [];
    this.#noTileColliders = [];
  }

  get colliders() {
    return this.#colliders;
  }

  /**
   * @param {import('./Collider').Collider} collider
   */
  add(collider) {
    this.#colliders.push(collider);
    if (!collider.gameObject.isSolidTile) {
      this.#noTileColliders.push(collider);
    }
  }

  /**
   * @param {import('./Collider').Collider} collider
   */
  remove(collider) {
    const idx = this.#colliders.findIndex((x) => x === collider);
    if (idx === -1) return;
    this.#colliders.splice(idx, 1);

    const noTileIdx = this.#noTileColliders.findIndex((x) => x === collider);
    if (noTileIdx === -1) return;
    this.#noTileColliders.splice(noTileIdx, 1);
  }

  detectCollisions() {
    /** @type {import('../../shared').Collision[]} */
    const collisions = [];
    this.#noTileColliders.forEach((collider1) => {
      this.#colliders.forEach((collider2) => {
        if (collider1 !== collider2) {
          const collision1 = collider1.hasCollisionWith(collider2);
          const collision2 = collider2.hasCollisionWith(collider1);

          if (collision1) {
            collisions.push(collision1);
          }

          if (collision2) {
            collisions.push(collision2);
          }
        }
      });
    });

    collisions.forEach((collision) => {
      collision.gameObject1.onCollision(collision, collision.gameObject2);
    });
  }
}

class Animation {
  #isFinished = false;

  #flipped = false;

  /**
   * @type {boolean | undefined}
   */
  #doOnce;

  #frameCount = 0;

  #animationInterval = 0;

  /**
   * @type {import('../../shared').Sprite[]}
   */
  #assets = [];

  /**
   * @type {import('../../shared').Sprite | undefined}
   */
  #sprite;

  get sprite() {
    return this.#sprite;
  }

  get isFinished() {
    return this.#isFinished;
  }

  /**
   * @param {boolean} b
   */
  set flipped(b) {
    this.#flipped = b;
  }

  /**
   * @param {number} animationInterval
   * @param {import('../../shared').Sprite[]} assets
   * @param {boolean} doOnce
   */
  reset(animationInterval, assets, doOnce = false) {
    this.#animationInterval = animationInterval;
    this.#assets = assets;
    // eslint-disable-next-line prefer-destructuring
    this.#sprite = this.#assets.length > 0 ? this.#assets[0] : undefined;
    this.#frameCount = 0;
    this.#doOnce = doOnce;
    this.#isFinished = false;
  }

  /**
   * @param {import('../../shared').Buffer} buffer
   * @param {import('../../shared').Vector} position
   */
  update(buffer, position) {
    if (!this.#sprite) return;
    this.#frameCount += 1;
    if (this.#frameCount === this.#animationInterval) {
      if (this.#nextSprite() === this.#assets[0] && this.#doOnce) {
        this.#isFinished = true;
      } else {
        this.#isFinished = false;
        this.#sprite = this.#nextSprite();
        this.#frameCount = 0;
      }
    }
    const spriteToDraw = this.#flipped ? this.#sprite.flip() : this.#sprite;
    buffer.draw(position, spriteToDraw);
  }

  #nextSprite() {
    const nextElemIndex =
      // @ts-ignore
      this.#assets.indexOf(this.#sprite) + 1 === this.#assets.length ? 0 : this.#assets.indexOf(this.#sprite) + 1;
    return this.#assets[nextElemIndex];
  }
}

const GRAVITY_VECTOR = new Vector(0, 0.2);
const TILE_SIZE = 32;

const KING_RUN_VELOCITY = 2;
const KING_JUMP_IMPULSE = 6;
const KING_AIR_HORIZONTAL_VELOCITY = 1;
const KING_ATTACK_DELAY_FRAMES = 30;
const KING_ATTACK_SIZE = new Vector(64, 48);
const KING_DEFAULT_ANIMATION_INTERVAL = 10;
const KING_ATTACK_ANIMATION_INTERVAL = 5;
const KING_RESTITUTION = 0;
const KING_RUN_ANIMATION_INTERVAL = 3;
const KING_MAX_HP = 5;

const PIG_RUN_VELOCITY = 1.5;
const PIG_JUMP_IMPULSE = 4.5;
const PIG_AIR_HORIZONTAL_VELOCITY = 0.75;
const PIG_JUMP_THRESHOLD = 32;
const PIG_ATTACK_SIZE = new Vector(16, 32);
const PIG_ATTACK_OFFSET = 8;
const PIG_ATTACK_RANGE = 12;
const PIG_BASIC_MAX_HP = 2;
const PIG_KING_MAX_HP = 10;
const PIG_DETECTION_SIZE_HALF = new Vector(64, 32);
const PIG_RESTITUTION = 0.1;
const PIG_ANIMATION_INTERVAL = 10;
const PIG_DEFAULT_ASSET_FACING = 'left';

const DOOR_HITBOX_SIZE = 4;
const DOOR_ANIMATION_INTERVAL = 10;

class Rigidbody {
  #velocityVector = Vector.Zero;

  #accelerationVector = Vector.Zero;

  addGravity() {
    this.addAcceleration(GRAVITY_VECTOR);
  }

  get velocity() {
    return this.#velocityVector;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  set velocity(v) {
    this.#velocityVector = v;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  addVelocity(v) {
    this.#velocityVector = this.#velocityVector.add(v);
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  addAcceleration(v) {
    this.#accelerationVector = this.#accelerationVector.add(v);
  }

  /**
   * @param {import('./Transform').Transform} transform
   */
  update(transform) {
    this.#velocityVector = this.#velocityVector.add(this.#accelerationVector);
    // eslint-disable-next-line no-param-reassign
    transform.origin = transform.origin.add(this.#velocityVector);
  }
}

class Transform {
  #position = Vector.Zero;

  #origin = Vector.Zero;

  #width = 0;

  #height = 0;

  get width() {
    return this.#width;
  }

  /**
   * @param {number} w
   */
  set width(w) {
    this.#width = w;
  }

  get height() {
    return this.#height;
  }

  /**
   * @param {number} h
   */
  set height(h) {
    this.#height = h;
  }

  get position() {
    return this.#position;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  set position(v) {
    this.#position = v;
    this.#updateOrigin();
  }

  get origin() {
    return this.#origin;
  }

  /**
   * @param {import('../../shared').Vector} v
   */
  set origin(v) {
    this.#origin = v;
    this.#updatePosition();
  }

  #updatePosition() {
    this.#position = new Vector(this.#origin.x - 0.5 * this.#width, this.#origin.y - 0.5 * this.#height);
  }

  #updateOrigin() {
    this.#origin = new Vector(this.#position.x + 0.5 * this.#width, this.#position.y + 0.5 * this.#height);
  }
}

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

/* eslint-disable class-methods-use-this */

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
}

/** @typedef {'Cancel' | 'Help' | 'Backspace' | 'Tab' | 'Clear' | 'Enter' | 'Enter' | 'Shift' | 'Control' | 'Alt' | 'Pause' | 'CapsLock' | 'Escape' | ' ' | 'PageUp' | 'PageDown' | 'End' | 'Home' | 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'PrintScreen' | 'Insert' | 'Delete' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'Meta' | 'Meta' | 'Meta' | 'ContextMenu' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '*' | '+' | '-' | '.' | '/' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'F13' | 'F14' | 'F15' | 'F16' | 'F17' | 'F18' | 'F19' | 'F20' | 'F21' | 'F22' | 'F23' | 'F24' | 'NumLock' | 'ScrollLock' | ';' | '=' | ',' | '-' | '.' | '/' | '`' | '[' | '\\' | ']' | "'"} KeyType */

class WindowKeyboardInput {
  /**
   * @type {Record<string, boolean>}
   */
  #keymap = {};

  constructor() {
    window.addEventListener('keydown', this.#onKeyDown.bind(this));
    window.addEventListener('keyup', this.#onKeyUp.bind(this));
  }

  /**
   * @param {KeyType} key
   */
  pressed(key) {
    if (!(key in this.#keymap)) {
      this.#keymap[key] = false;
      return false;
    }
    return this.#keymap[key];
  }

  /**
   * @returns {KeyType[]}
   */
  allPressed() {
    // @ts-ignore
    return Object.entries(this.#keymap)
      .filter((x) => x[1])
      .map((x) => x[0]);
  }

  /**
   * @param {KeyboardEvent} e
   */
  #onKeyDown(e) {
    this.#keymap[e.key] = true;
  }

  /**
   * @param {KeyboardEvent} e
   */
  #onKeyUp(e) {
    this.#keymap[e.key] = false;
  }
}

/** @typedef {Readonly<{ keyboard: WindowKeyboardInput , ui:import('../../shared').UIProxy}>} Services */

/**
 * @template {Record<string, typeof import('./GameScene').GameScene>} TScenes
 */
class GameEngine {
  /** @typedef {keyof TScenes} SceneName */

  /** @type {SceneName | undefined} */
  #currentSceneName;

  #gameLoop;

  #sceneManager;

  #scenes;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('../../shared').UIProxy} ui
   * @param {TScenes} scenes
   */
  constructor(canvas, ui, scenes) {
    const display = new CanvasDisplay(canvas);
    const buffer = new CanvasBuffer(canvas);
    const keyboard = new WindowKeyboardInput();
    this.#scenes = scenes;
    this.#sceneManager = new GameSceneManager({ keyboard, ui });
    this.#gameLoop = new GameLoop(display, buffer, (frame) => {
      this.#onFrame(frame);
    });
  }

  get scene() {
    return this.#currentSceneName;
  }

  /**
   * @param {SceneName} sceneName
   */
  load(sceneName) {
    this.#currentSceneName = sceneName;
    this.reset();
    return this;
  }

  start() {
    if (!this.#currentSceneName) {
      throw new Error('Scene not loaded');
    }
    this.#gameLoop.start();
    return this;
  }

  stop() {
    this.#gameLoop.stop();
    return this;
  }

  reset() {
    this.#gameLoop.reset();
    if (this.#currentSceneName) {
      this.#sceneManager.load(this.#scenes[this.#currentSceneName]);
    }
    return this;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  #onFrame(frame) {
    this.#sceneManager.update(frame);
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * @template {Record<string, any>} T
 * @template {GameObject<T>} R
 * @typedef {new (proxy: import('./internals/GameObjectImpl').GameObjectProxy<T>) => R} GameObjectConstructor
 */

/**
 * @template {Record<string, any>} [T={}]
 */
class GameObject {
  // #region interface

  /**
   * @abstract
   * @param {T} args
   */
  onActivate(args) {}

  /**
   * @abstract
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {}

  /**
   * @abstract
   */
  onDestroy() {}

  /**
   * @abstract
   * @param {import('../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {}

  // #endregion

  // #region implementation

  #proxy;

  /**
   * @param {import('./internals/GameObjectImpl').GameObjectProxy<T>} proxy
   */
  constructor(proxy) {
    if (this.constructor === GameObject) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.#proxy = proxy;
  }

  get id() {
    return this.#proxy.id;
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

  /**
   * @template {unknown[]} R
   * @template {import('./internals/Collider').ColliderConstructor<R>} C
   * @param {C} Cls
   * @param {R} args
   */
  setCollider(Cls, args) {
    this.#proxy.setCollider(Cls, args);
  }

  get collider() {
    return this.#proxy.collider;
  }

  get ui() {
    return this.#proxy.ui;
  }

  get keyboard() {
    return this.#proxy.keyboard;
  }

  get transform() {
    return this.#proxy.transform;
  }

  get rigidbody() {
    return this.#proxy.rigidbody;
  }

  get position() {
    return this.#proxy.transform.position;
  }

  set position(val) {
    this.#proxy.transform.position = val;
  }

  get animation() {
    return this.#proxy.animation;
  }

  get isSolidTile() {
    return false;
  }

  // #endregion
}

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

/**
 * @param {string} input string with 3 non-empty lines and 3 non-whitespace characters in each line
 * @returns {string[][]} array of 3 rows, each one being an array of 3 characters
 */
function stringToCharMatrix(input) {
  return input
    .trim()
    .split('\n')
    .map((line) => line.trim().split(''));
}

/**
 * @template T type of matrix's elements
 * @param {T[][]} input input matrix
 * @param {number} times number of 90 degree clockwise rotations to perform
 * @returns {T[][]}
 */
function rotateClockwiseMatrix3x3(input, times = 1) {
  let matrix = input;

  for (let i = 0; i < times; i++) {
    matrix = [
      [matrix[2][0], matrix[1][0], matrix[0][0]],
      [matrix[2][1], matrix[1][1], matrix[0][1]],
      [matrix[2][2], matrix[1][2], matrix[0][2]],
    ];
  }

  return matrix;
}

/**
 * @param {string[]} templates
 * @returns {[Readonly<{ pattern: ("X" | "." | "?")[][], texturePos: Vector }[]>, number]} a tuple of tile rule array and tileset row count
 */
function generateTileRules(templates) {
  return [
    Object.freeze(
      templates.flatMap((ruleTemplate, templateIndex) => {
        const pattern = stringToCharMatrix(ruleTemplate);

        return _.uniqWith(
          _.times(4, (n) => ({
            pattern: /** @type {('X' | '.' | '?')[][]} */ (rotateClockwiseMatrix3x3(pattern, n)),
            texturePos: new Vector(n, templateIndex),
          })),
          // Remove duplicates if pattern is symmetric
          (firstRule, secondRule) => _.isEqual(firstRule.pattern, secondRule.pattern),
        );
      }),
    ),
    templates.length,
  ];
}

/**
 * @param {('X' | '.' | '?')[][]} first
 * @param {('X' | '.' | '?')[][]} second
 * @returns {boolean}
 */
function patternsMatch(first, second) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const elem1 = first[row][col];
      const elem2 = second[row][col];

      // '?' matches everything
      if (elem1 !== '?' && elem2 !== '?' && elem1 !== elem2) {
        return false;
      }
    }
  }

  return true;
}

const [tileRules, tilesetRowCount] = generateTileRules(
  /**
   * Each tile type has a number of different sprites depending on it's surroundings.
   * Which sprite should be used depends on the 8 tiles next to a given tile.
   * Those rules are generated based on this array.
   * Each array element corresponds to a single row in tileset.png.
   * It describes the neighbourhood corresponding to the first element in the given row of tileset.png.
   *
   * Meanings of symbols:
   * - 'X' - there is a solid block at this place
   * - '.' - there is only background at this place
   * - '?' - it is irrelevant what this place contains
   * For each pattern template, there are four tile rules generated - one for each rotation: 0, 90, 180 and 270 deg.
   *
   * tileRules.test.js should verify that exactly one rule matches each possible neighbourhood.
   */ [
    `XXX
     XXX
     XXX`,
    `?.?
     .X.
     ?.?`,
    `?.?
     XXX
     XXX`,
    `?.?
     .X.
     ?X?`,
    `?.?
     XX.
     XX?`,
    `XX.
     XXX
     XXX`,
    `?X?
     .X.
     ?X?`,
    `.X.
     XXX
     XXX`,
    `.X.
     XXX
     XX.`,
    `.X.
     XXX
     .X.`,
    `XX.
     XXX
     .XX`,
    `XX.
     XXX
     ?.?`,
    `?X.
     .XX
     ?XX`,
    `?X.
     .XX
     ?X.`,
    `?X.
     .XX
     ?.?`,
    `...
     ...
     ...`,
    `?X?
     X.X
     ?X?`,
    `?X?
     X.X
     ?.?`,
    `?X?
     ...
     ...`,
    `?X?
     ..X
     ..?`,
    `?.?
     X.X
     ?.?`,
    `..X
     ...
     ...`,
    `X.X
     ...
     ...`,
    `X.X
     ...
     ..X`,
    `X.X
     ...
     X.X`,
    `..X
     ...
     X..`,
    `..X
     ...
     ?X?`,
    `?.X
     X..
     ?..`,
    `?X?
     ...
     X.X`,
    `?.X
     X..
     ?X?`,
  ],
);

var doorUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAA4CAMAAAAVW5AoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAqUExURW5ZZ/vKru2nmfrrz+KJidJyfpJkda1we114ibmAgMOUkHKIloagqAAAALJtmJwAAAAOdFJOU/////////////////8ARcDcyAAAAAlwSFlzAAAOwwAADsMBx2+oZAAABONJREFUWEftmVFjGjEMgw9oGR3s///dyZaS2Ilzax94m9aVO+fDVZQQynb8aTpOJCRIA6WEBGmglBBA7fG4XI/r5XK5XW63cMnruf1baD4ePnzgrxQu/foa27+J9u/HFQ5P8dvt2ru/i7ZvoK3M5Fzhsl337m+j8Zf09ePj+OgKl3ZtT2je30bbF66N/tSWXvRJ/sLmb6MPGCeN+v0XdT+OR7/Djby79Ym+kzXdrbClfSQLOL53Gn9wcUlOjEB7Xau7UdZ8omcrJ7RDUahFmi+1q9FJat8l6yU9s+f0qkZ34yMT87pYofWFDqkEVbQFUKvRxJ3++k19IcsnFmjco01sPmi3AtaE2p6GSEV5edAWomWIojVyyYrucI+CpcjIIx2t9FpFK5UcYLMoeqM19L1+wJ6jch5TQCzPGIqN5nkOGrNlKndVKprTRy7JilctrJYK1/PxfBxs5cJzdAX5YFr916ARMPu3BQb9mugHl8hNBrH26PRhJ/PH8Xw9k5V454OG3xr9evZxNGMq3cpTVgLdraRUWBu0cBthK1eywshj80AvViqaC1Sm4gtEWiFGH9bulSu/HO+RhzH0ennjtlegiZaReq9YWfSYZxLbB03zjFrYPV2/gkTL+azzVLL+lUpQtDLCEj2FSNkLVG2l3DzQOOPyXjGVtO2KaIVVaLKiahNmqq5Sbi7KBCtMZW9FpO3acys8htZU5gWKh1aVSl6ggp5TaU2wQKQ3Yvvv6QdsvW2b6DxlgGnhgNS1a5pnCACTYn9MUrUyFctksaKRlgrXU02a8BxdSXn1VYTQSv1xpVq9VxyarGik7RW+9tWD4tNSLI73k0JFSLM1hc2Saf3AQhoR3XA1MX0dr5d9tV+doI7PNF5rfAHhoVcnui8Q3rmG7KYtEGmFmIW3KHwlGd4jjxKY+Zp+JCtjsUTLeRathKSmeUYNK32FdvRqxWJZUvGsKJwUbkWNXdM8O+2sd4b17r2isUKrFe/R6IZ7Ufq3FYHftEL021aKVJYFmuZpilamBZroMhUbGW+HPIayaCUpHVpRw0pQTW+3LWkpJIBJFVaSBu2s6YRnhGUqWXSuzpSsjDVDmzRPcVC0wg/NK81quVfwjEFrPdWZkhW1MAHnes50ZWWme7Xetp1ezs+xQDkVYP2kqBcophJpllHdpkK6OLS8r35CV2oeNawE1fR225JuIWqWpi/7mISv8B40nRQxFYAmPIxqpvep+Mh4MXfnsb+9m/d73K7z1Kj/BLu3vqzY9UT7j7T6JDpstJznT4fIJWTig2me49Oh9aIV/Div9E+Hgdb2XGTVQQufPzNHYz44NW+0N2ttvQJ6tsLPzAaN/eGyavjMTNzq3sll7XUJ9ch780FbKrTSUqloWyBbidkK6m2BzAqPoVlxg7nqo9y1sHt6siK1I47yjdXkWzGEpKkODdr+1antFbE72uafrIQ6ReesNtlM1VYqj3Jo/APY+BVhRzsWpDLex0lrPddU1FXKq1+lkq0U9JIKy2aFdHF+mtZPh8DW89PVtq3YM7peINEbK+k5phMrC7unCxRqVvAAPGWAaZVWeuSBxqQ2Vpbl7Gs5S7S2lho32XPUwAU8bkRRJoypf/8dYaZVtXq2wid0+rD/lvmsUumdfT6f/t83Kz1S6VZmeptKq4r+r0XH8RfhTWbY24PSiAAAAABJRU5ErkJggg==";

var tilesetUrl = "/CodersCamp2021.Project.React/assets/tileset.88bf8ee3.png";

var kingUrl$1 = "/CodersCamp2021.Project.React/assets/king.7f31e027.png";

var pigUrl$1 = "/CodersCamp2021.Project.React/assets/pig.610739ce.png";

var flagUrl = "/CodersCamp2021.Project.React/assets/flag.77d3981a.png";

var windowUrl = "/CodersCamp2021.Project.React/assets/window.6ac3df55.png";

var heartUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAOCAYAAADAKpWLAAAAAXNSR0IArs4c6QAAAdxJREFUWIXtmDFuwjAUhn9QIzIEEqldKtFW7Awd2TgDJ+AIuQBjL8AROAFnYMvYoTuiVOoSpAAZgpCgQ3BJjG3i4Da08TcFR3x6z/6jxAY0mguoFF2A5jrpdnp7cj3xxhXye+KNU5kRBoiW8MZki/kvnmtD9fy8bO9Qr23g7tYYNQwEoQl3t055uEKWBACG1TocK2LKyuRJuoDig/hT8+NYEQDAbjcBADPPT3mYsqQEAB5ul6n7PFlZPLRLxYIRWEFMjv9mX0kPcSzfPtBfbb8dN6LmzuFYEbC6xPA3PfSCOVaEEYzD3Qh2uwkbwNAD3E5vnzXQ9doG7mGMBNFuN+NFE3hU9cWD1MBCOkAimfakES0YHR7CqHEMYrK2oecLw8hDRV+i/1ezCILQzCTTnuOC5fGtNzWui3yLyNaj+qGgYQaIpHxg+ABOGwPiIpPvQu2JPWTBznloB4G4gtDEzPMRhCbmC1vKlbcvmvnCPhmjvZm/yIH4HU0KHBh+rm2h9ogdNCQUeVx56mk9PePxvsXciQFAf7XF++e0Mp29AshwkMhqUGaStUfOQ1NEPbxdndQ5EE+YZ3LK4iEUfRCpoq+sQZRO5aWT818914aKvlQ9YJoS0+309rzXKwB8AWDdsjXVEFS3AAAAAElFTkSuQmCC";

const AssetsManager = Object.freeze({
  king: {
    doorIn: _.times(7, (x) => new Sprite(kingUrl$1, new Crop(new Vector(78 + 78 * x, 0), 78, 58))),
    doorOut: _.times(8, (x) => new Sprite(kingUrl$1, new Crop(new Vector(624 + 78 * x, 0), 78, 58))),
    fall: [new Sprite(kingUrl$1, new Crop(new Vector(1248, 0), 78, 58))],
    ground: [new Sprite(kingUrl$1, new Crop(new Vector(1326, 0), 78, 58))],
    hit: _.times(2, (x) => new Sprite(kingUrl$1, new Crop(new Vector(1404 + 78 * x, 0), 78, 58))),
    idle: _.times(11, (x) => new Sprite(kingUrl$1, new Crop(new Vector(1560 + 78 * x, 0), 78, 58))),
    jump: [new Sprite(kingUrl$1, new Crop(new Vector(2418, 0), 78, 58))],
    run: _.times(8, (x) => new Sprite(kingUrl$1, new Crop(new Vector(2496 + 78 * x, 0), 78, 58))),
    attack: _.times(3, (x) => new Sprite(kingUrl$1, new Crop(new Vector(3120 + 78 * x, 0), 78, 58))),
    dead: _.times(4, (x) => new Sprite(kingUrl$1, new Crop(new Vector(3354 + 78 * x, 0), 78, 58))),
  },
  tileset: _.range(tilesetRowCount).map((y) =>
    _.range(4).map(
      (x) => new Sprite(tilesetUrl, new Crop(new Vector(x * TILE_SIZE, y * TILE_SIZE), TILE_SIZE, TILE_SIZE)),
    ),
  ),
  door: {
    normal: [new Sprite(doorUrl, new Crop(new Vector(0, 0), 46, 56))],
    open: _.times(3, (x) => new Sprite(doorUrl, new Crop(new Vector(46 * x, 0), 46, 56))),
    close: _.times(3, (x) => new Sprite(doorUrl, new Crop(new Vector(92 - 46 * x, 0), 46, 56))),
  },
  flag: new Sprite(flagUrl, new Crop(new Vector(0, 0), 26, 89)),
  window: new Sprite(windowUrl, new Crop(new Vector(0, 0), 54, 57)),
  heart: new Sprite(heartUrl, new Crop(new Vector(0, 0), 18, 14)),
  pig: Object.fromEntries(
    ['basic', 'king'].map((variant, i) => [
      variant,
      {
        idle: _.times(11, (x) => new Sprite(pigUrl$1, new Crop(new Vector(34 * x, i * 140), 34, 28))),
        jump: [new Sprite(pigUrl$1, new Crop(new Vector(0, 28 + i * 140), 34, 28))],
        fall: [new Sprite(pigUrl$1, new Crop(new Vector(34, 28 + i * 140), 34, 28))],
        ground: [new Sprite(pigUrl$1, new Crop(new Vector(68, 28 + i * 140), 34, 28))],
        run: _.times(6, (x) => new Sprite(pigUrl$1, new Crop(new Vector(34 * x, 56 + i * 140), 34, 28))),
        attack: _.times(5, (x) => new Sprite(pigUrl$1, new Crop(new Vector(34 * x, 84 + i * 140), 34, 28))),
        hit: _.times(2, (x) => new Sprite(pigUrl$1, new Crop(new Vector(34 * x, 112 + i * 140), 34, 28))),
        dead: _.times(4, (x) => new Sprite(pigUrl$1, new Crop(new Vector(68 + 34 * x, 112 + i * 140), 34, 28))),
      },
    ]),
  ),
});

/**
 * @abstract
 */
class PigStateAnimated {
  #pig;

  /**
   * @param {import('./Pig').Pig} pig
   * @param {import('../../shared/Sprite').Sprite[]} sprites
   * @param {boolean} doOnce
   */
  constructor(pig, sprites, doOnce = false) {
    if (this.constructor === PigStateAnimated) {
      throw new Error('Abstract class constructor.');
    }

    this.#pig = pig;

    pig.animation.reset(PIG_ANIMATION_INTERVAL, sprites, doOnce);
  }

  get pig() {
    return this.#pig;
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}
}

class PigIdle extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].idle);
  }

  update() {
    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.kingWasSpotted) {
      this.pig.transitionState('run');
    }
  }
}

class PigFall extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].fall);
  }

  update() {
    if (this.pig.isStanding) {
      this.pig.transitionState('ground');
    }
  }
}

class PigGround extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].ground, true);
  }

  update() {
    if (this.pig.animation.isFinished) {
      if (this.pig.kingWasSpotted) {
        this.pig.transitionState('run');
      } else {
        this.pig.transitionState('idle');
      }
    }
  }
}

class PigRun extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].run);
  }

  update() {
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(this.pig.kingDirectionX * PIG_RUN_VELOCITY);

    if (this.pig.king.transform.origin.distanceSquaredTo(this.pig.transform.origin) <= PIG_ATTACK_RANGE ** 2) {
      this.pig.transitionState('attack');
    } else if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.transform.origin.y - this.pig.king.transform.origin.y > PIG_JUMP_THRESHOLD) {
      this.pig.transitionState('jump');
    }

    // In case we return to running after being hit
    if (this.pig.animation.isFinished) {
      this.pig.animation.reset(PIG_ANIMATION_INTERVAL, AssetsManager.pig[this.pig.variant].run);
    }
  }
}

class PigJump extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].jump);
    pig.rigidbody.addVelocity(new Vector(0, -PIG_JUMP_IMPULSE));
  }

  update() {
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(
      this.pig.kingDirectionX * PIG_AIR_HORIZONTAL_VELOCITY,
    );

    if (this.pig.isFalling) {
      this.pig.transitionState('fall');
    } else if (this.pig.isStanding) {
      this.pig.transitionState('ground');
    }
  }
}

class PigSwing extends GameObject {
  /**
   * @param {{ attackCenter: Vector }} args
   */
  onActivate({ attackCenter }) {
    this.transform.origin = attackCenter ?? Vector.Zero;
    this.transform.width = PIG_ATTACK_SIZE.x;
    this.transform.height = PIG_ATTACK_SIZE.y;
    this.setCollider(BoxCollider, [PIG_ATTACK_SIZE]);
  }

  onUpdate() {
    this.destroy(this);
  }
}

class PigAttack extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].attack, true);
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(0);

    this.pig.create(PigSwing, {
      args: {
        attackCenter: this.pig.transform.origin.add(this.pig.facingVector.scale(PIG_ATTACK_OFFSET)),
      },
    });
  }

  update() {
    if (this.pig.animation.isFinished) {
      this.pig.transitionState('run');
    }
  }
}

class PigHit extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].hit, true);
  }

  update() {
    if (this.pig.animation.isFinished) {
      if (this.pig.hp <= 0) {
        this.pig.transitionState('dead');
      } else {
        this.pig.returnToPreviousState();
      }
    }
  }
}

class PigDead extends PigStateAnimated {
  /**
   * @param {import('./Pig').Pig} pig
   */
  constructor(pig) {
    super(pig, AssetsManager.pig[pig.variant].dead, true);
    this.pig.rigidbody.velocity = this.pig.rigidbody.velocity.setX(0);
  }

  // eslint-disable-next-line consistent-return
  update() {
    if (this.pig.animation.isFinished) {
      if (this.pig.variant === 'king') return this.pig.ui.gameOver();
      this.pig.destroy(this.pig);
    }
  }
}

class KingSwing extends GameObject {
  /**
   * @param {{ attackCenter: Vector }} args
   */
  onActivate({ attackCenter }) {
    this.transform.origin = attackCenter ?? Vector.Zero;
    this.transform.width = KING_ATTACK_SIZE.x;
    this.transform.height = KING_ATTACK_SIZE.y;
    this.setCollider(BoxCollider, [KING_ATTACK_SIZE]);
  }

  onUpdate() {
    this.destroy(this);
  }
}

const stateMap = Object.freeze({
  idle: PigIdle,
  fall: PigFall,
  ground: PigGround,
  run: PigRun,
  jump: PigJump,
  attack: PigAttack,
  hit: PigHit,
  dead: PigDead,
});

/**
 * @typedef {keyof stateMap} PigStateKey
 */

class Pig extends GameObject {
  /** @type {import('./PigStateAnimated').PigStateAnimated?} */
  #state = null;

  /** @type {import('./PigStateAnimated').PigStateAnimated?} */
  #previousState = null;

  /** @type {'basic' | 'king'} */
  #variant = 'basic';

  /** @type {'left' | 'right'} */
  #facing = PIG_DEFAULT_ASSET_FACING;

  #isStanding = false;

  #kingWasSpotted = false;

  #hp = PIG_BASIC_MAX_HP;

  /** @type {import('../King').King?} */
  #king = null;

  get variant() {
    return this.#variant;
  }

  get facing() {
    return this.#facing;
  }

  get facingVector() {
    return Vector.Zero.setX(this.#facing === 'left' ? -1 : 1);
  }

  get isStanding() {
    return this.#isStanding;
  }

  get kingWasSpotted() {
    return this.#kingWasSpotted;
  }

  get hp() {
    return this.#hp;
  }

  get isFalling() {
    return this.rigidbody.velocity.y > 1;
  }

  get king() {
    return /** @type {import('../King').King} */ (this.#king);
  }

  get kingDirectionX() {
    return Math.sign(this.king.transform.origin.subtract(this.transform.origin).x);
  }

  #damage() {
    this.#kingWasSpotted = true;

    if (!(this.#state instanceof PigHit || this.#state instanceof PigDead)) {
      this.#hp -= 1;
      this.transitionState('hit');
    }
  }

  /**
   * @param {{ initialPos: Vector, level: import('../../scenes/LevelScene').LevelScene, variant: 'basic' | 'king', facing?: 'left' | 'right' }} args
   */
  onActivate({ initialPos, level, variant, facing }) {
    this.transform.origin = initialPos ?? Vector.Zero;
    this.transform.width = 34;
    this.transform.height = 28;
    this.#variant = variant ?? 'basic';
    this.#facing = facing ?? PIG_DEFAULT_ASSET_FACING;
    this.#hp = variant === 'king' ? PIG_KING_MAX_HP : PIG_BASIC_MAX_HP;

    this.#state = new PigIdle(this);
    this.animation.flipped = this.#facing !== PIG_DEFAULT_ASSET_FACING;

    this.rigidbody.addGravity();
    this.setCollider(BoxCollider, [new Vector(24, 18), new Vector(5, 10)]);

    this.#king = level.king;
  }

  /**
   * @param {import('../../shared/Frame').Frame} _frame
   */
  onUpdate(_frame) {
    if (!this.#kingWasSpotted) {
      const detectionCenter = this.transform.origin.add(this.facingVector.scale(PIG_DETECTION_SIZE_HALF.x));
      const detectionTopLeft = detectionCenter.subtract(PIG_DETECTION_SIZE_HALF);
      const detectionBottomRight = detectionCenter.add(PIG_DETECTION_SIZE_HALF);

      if (
        detectionTopLeft.x <= this.king.transform.origin.x &&
        this.king.transform.origin.x <= detectionBottomRight.x &&
        detectionTopLeft.y <= this.king.transform.origin.y &&
        this.king.transform.origin.y <= detectionBottomRight.y
      ) {
        this.#kingWasSpotted = true;
      }
    } else if (!(this.#state instanceof PigDead)) {
      this.#facing = this.kingDirectionX <= 0 ? 'left' : 'right';
      this.animation.flipped = this.#facing !== PIG_DEFAULT_ASSET_FACING;
    }

    this.#state?.update();
    this.#isStanding = false;
  }

  /**
   * @param {import('../../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {
    if (target.isSolidTile && collision.resolutionVector.y < 0) {
      this.#isStanding = true;
    } else if (target instanceof KingSwing) {
      this.#damage();
    }
  }

  /**
   * @param {PigStateKey} key
   */
  transitionState(key) {
    this.#previousState = this.#state;
    this.#state = new stateMap[key](this);
  }

  returnToPreviousState() {
    [this.#state, this.#previousState] = [this.#previousState, this.#state];
  }
}

class KingState {
  #king;

  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    if (this.constructor === KingState) {
      throw new Error('Abstract class ctor.');
    }
    this.#king = king;
  }

  get king() {
    return this.#king;
  }

  get position() {
    return this.king.position;
  }

  set position(val) {
    this.king.position = val;
  }

  /**
   * @param {import('../../shared/Frame').Frame} _frame
   */
  // eslint-disable-next-line class-methods-use-this
  update(_frame) {
    throw new Error('Abstract method.');
  }
}

class KingAnimated extends KingState {
  /**
   * @param {import('./King').King} king
   * @param {import('../../shared/Sprite').Sprite[]} sprites
   * @param {number} updateAfter
   * @param {boolean} doOnce
   */
  constructor(king, sprites, updateAfter, doOnce = false) {
    super(king);
    if (this.constructor === KingAnimated) {
      throw new Error('Abstract class ctor.');
    }
    if (sprites.length <= 0) {
      throw new Error('Sprites length should be greater than 0.');
    }
    king.animation.reset(updateAfter, sprites, doOnce);
  }

  /**
   * @param {import('../../shared/Frame').Frame} _frame
   */
  update(_frame) {
    const width = this.king.animation.sprite?.width ?? 0;
    const height = this.king.animation.sprite?.height ?? 0;
    this.king.transform.width = width;
    this.king.transform.height = height;
  }
}

class KingAttack extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.attack, KING_ATTACK_ANIMATION_INTERVAL, true);

    this.king.create(KingSwing, {
      args: {
        attackCenter: this.king.transform.origin,
      },
    });
  }

  /**
   * @param {import("../../shared/Frame").Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      if (this.king.isOnGround) {
        return this.king.transitionState('idle').onUpdate(frame);
      }
      return this.king.transitionState('fall').onUpdate(frame);
    }
    return super.update(frame);
  }
}

class KingDead extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.dead, KING_DEFAULT_ANIMATION_INTERVAL, true);
  }

  /**
   * @param {import("../../shared/Frame").Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      return this.king.ui.levelLost();
    }
    return super.update(frame);
  }
}

class KingDoorIn extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.doorIn, KING_DEFAULT_ANIMATION_INTERVAL, true);
    this.king.rigidbody.velocity = Vector.Zero;
  }

  /**
   * @param {import("../../shared/Frame").Frame} _frame
   */
  update(_frame) {
    if (this.king.animation.isFinished) {
      this.king.ui.levelWon();
    }
  }
}

class KingDoorOut extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.doorOut, KING_DEFAULT_ANIMATION_INTERVAL, true);
  }

  /**
   * @param {import("../../shared/Frame").Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    return super.update(frame);
  }
}

class KingFall extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.fall, KING_DEFAULT_ANIMATION_INTERVAL);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.isOnGround) {
      return this.king.transitionState('ground').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowRight')) {
      this.king.flipRight();
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(KING_AIR_HORIZONTAL_VELOCITY);
    }
    if (this.king.keyboard.pressed('ArrowLeft')) {
      this.king.flipLeft();
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(-KING_AIR_HORIZONTAL_VELOCITY);
    }
    if (!this.king.keyboard.pressed('ArrowRight') && !this.king.keyboard.pressed('ArrowLeft')) {
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(0);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.delayAttack();
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    return super.update(frame);
  }
}

class KingGround extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.ground, KING_DEFAULT_ANIMATION_INTERVAL, true);
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    return super.update(frame);
  }
}

class KingHit extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.hit, KING_DEFAULT_ANIMATION_INTERVAL, true);
  }

  /**
   * @param {import("../../shared/Frame").Frame} frame
   */
  update(frame) {
    if (this.king.animation.isFinished) {
      if (this.king.hp <= 0) {
        return this.king.transitionState('dead').onUpdate(frame);
      }
      if (this.king.isOnGround) {
        return this.king.transitionState('idle').onUpdate(frame);
      }
      if (!this.king.isOnGround) {
        return this.king.transitionState('fall').onUpdate(frame);
      }
    }
    return super.update(frame);
  }
}

class KingIdle extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.idle, KING_DEFAULT_ANIMATION_INTERVAL);
    // eslint-disable-next-line no-param-reassign
    king.rigidbody.velocity = Vector.Zero;
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.keyboard.pressed('ArrowLeft')) {
      this.king.flipLeft();
      return this.king.transitionState('runLeft').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowRight')) {
      this.king.flipRight();
      return this.king.transitionState('runRight').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.delayAttack();
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    if (this.king.keyboard.pressed('ArrowUp')) {
      return this.king.transitionState('jump').onUpdate(frame);
    }
    if (this.king.rigidbody.velocity.y > 1) {
      return this.king.transitionState('fall').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowDown')) {
      return this.king.transitionState('ground').onUpdate(frame);
    }
    return super.update(frame);
  }
}

class KingJump extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.jump, KING_DEFAULT_ANIMATION_INTERVAL);
    king.rigidbody.addVelocity(new Vector(0, -KING_JUMP_IMPULSE));
  }

  /**
   * @param {import('../../shared').Frame} frame
   */
  update(frame) {
    if (this.king.rigidbody.velocity.y > 0) {
      return this.king.transitionState('fall').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('ArrowRight')) {
      this.king.flipRight();
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(KING_AIR_HORIZONTAL_VELOCITY);
    }
    if (this.king.keyboard.pressed('ArrowLeft')) {
      this.king.flipLeft();
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(-KING_AIR_HORIZONTAL_VELOCITY);
    }
    if (!this.king.keyboard.pressed('ArrowRight') && !this.king.keyboard.pressed('ArrowLeft')) {
      this.king.rigidbody.velocity = this.king.rigidbody.velocity.setX(0);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.delayAttack();
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    return super.update(frame);
  }
}

class KingRunLeft extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.run, KING_RUN_ANIMATION_INTERVAL);
    king.rigidbody.addVelocity(new Vector(-KING_RUN_VELOCITY, 0));
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  update(frame) {
    if (this.king.keyboard.pressed('ArrowUp')) {
      return this.king.transitionState('jump').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.delayAttack();
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    if (!this.king.keyboard.pressed('ArrowLeft')) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    return super.update(frame);
  }
}

class KingRunRight extends KingAnimated {
  /**
   * @param {import('./King').King} king
   */
  constructor(king) {
    super(king, AssetsManager.king.run, KING_RUN_ANIMATION_INTERVAL);
    king.rigidbody.addVelocity(new Vector(KING_RUN_VELOCITY, 0));
  }

  /**
   * @param {import('../../shared/Frame').Frame} frame
   */
  update(frame) {
    if (this.king.keyboard.pressed('ArrowUp')) {
      return this.king.transitionState('jump').onUpdate(frame);
    }
    if (!this.king.keyboard.pressed('ArrowRight')) {
      return this.king.transitionState('idle').onUpdate(frame);
    }
    if (this.king.keyboard.pressed('x')) {
      if (this.king.canAttack) {
        this.king.delayAttack();
        return this.king.transitionState('attack').onUpdate(frame);
      }
      return super.update(frame);
    }
    return super.update(frame);
  }
}

class Door extends GameObject {
  /** @type {'start' | 'end'} */
  #type = 'start';

  /**
   * @param {Object} props
   * @param {'start' | 'end'} props.type
   * @param {Vector} props.position
   */
  onActivate({ type, position }) {
    this.#type = type;
    this.transform.width = 46;
    this.transform.height = 56;
    this.transform.origin = position.add(new Vector(TILE_SIZE / 2, TILE_SIZE - 28));

    if (this.#type === 'start') {
      this.animation.reset(DOOR_ANIMATION_INTERVAL, AssetsManager.door.close, true);
    } else {
      this.animation.reset(DOOR_ANIMATION_INTERVAL, AssetsManager.door.normal);
      this.setCollider(BoxCollider, [
        new Vector(DOOR_HITBOX_SIZE, DOOR_HITBOX_SIZE),
        new Vector((this.transform.width - DOOR_HITBOX_SIZE) / 2, this.transform.height - DOOR_HITBOX_SIZE),
      ]);
    }
  }

  open() {
    this.animation.reset(DOOR_ANIMATION_INTERVAL, AssetsManager.door.open, true);
  }
}

class Heart extends GameObject {
  #sprite = AssetsManager.heart;

  /**
   * @param {Object} props
   * @param {Vector} props.initialPos
   */
  onActivate({ initialPos }) {
    this.transform.origin = initialPos ?? Vector.Zero;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    frame.buffer.draw(this.position, this.#sprite);
  }
}

class HeartList extends GameObject {
  /**
   * @type {Array<GameObject>}
   */
  #list = [];

  /**
   * @param {number} hp
   */
  createHeartList(hp) {
    for (let i = 0; i < hp; i++) {
      this.#list.push(this.create(Heart, { args: { initialPos: new Vector(i * 15, 0) } }));
    }
  }

  clearHeartList() {
    this.#list.forEach((heart) => {
      this.destroy(heart);
    });
  }
}

/**
 * @typedef {'attack' | 'collision' | 'dead' | 'doorIn' | 'doorOut' | 'fall' | 'ground' | 'hit' | 'idle' | 'jump' | 'runLeft' | 'runRight' } KingStateKey
 */

class King extends GameObject {
  /**
   * @type {import('./KingState').KingState | undefined}
   */
  #state;

  #isOnGround = false;

  #attackCooldownFrames = 0;

  #hp = KING_MAX_HP;

  #heartList = this.create(HeartList);

  get isOnGround() {
    return this.#isOnGround;
  }

  get canAttack() {
    return this.#attackCooldownFrames <= 0;
  }

  get hp() {
    return this.#hp;
  }

  #damage() {
    if (!(this.#state instanceof KingHit || this.#state instanceof KingDead)) {
      this.#hp -= 1;
      this.transitionState('hit');
      this.#heartList.clearHeartList();
      this.#heartList.createHeartList(this.#hp);
    }
  }

  delayAttack() {
    this.#attackCooldownFrames = KING_ATTACK_DELAY_FRAMES;
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

    if (this.#attackCooldownFrames > 0) {
      this.#attackCooldownFrames -= 1;
    }
  }

  /**
   * @param {import('../../shared').Collision} collision
   * @param {GameObject} target
   */
  onCollision(collision, target) {
    if (target.isSolidTile && collision.resolutionVector.y < 0) {
      this.#isOnGround = true;
    } else if (target instanceof Door && !(this.#state instanceof KingDoorIn)) {
      target.open();
      this.transitionState('doorIn');
    } else if (
      target instanceof PigSwing &&
      ![KingDoorIn, KingHit, KingDead].some((state) => this.#state instanceof state)
    ) {
      this.#damage();
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

class SolidTile extends GameObject {
  /**
   * Associates colliding object classes with their restitutions.
   * If a class is not in this array it does not collide with SolidTile.
   *
   * @type {Readonly<{ Cls: import('../engine/GameObject').GameObjectConstructor<Record<string, any>, import('../engine/GameObject').GameObject<Record<string, any>>>, restitution: number }[]>}
   */
  static collidingObjects = Object.freeze([
    {
      Cls: Pig,
      restitution: PIG_RESTITUTION,
    },
    {
      Cls: King,
      restitution: KING_RESTITUTION,
    },
  ]);

  #sprite = AssetsManager.tileset[0][0];

  /**
   * @param {Object} props
   * @param {import('../shared').Sprite} props.sprite
   * @param {Vector} props.position
   */
  onActivate({ sprite, position }) {
    this.position = position;
    this.#sprite = sprite;
    this.setCollider(BoxCollider, [new Vector(this.#sprite.width, this.#sprite.height)]);
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    frame.buffer.draw(this.position, this.#sprite);
  }

  /**
   * @param {import('../shared').Collision} collision
   * @param {GameObject} target
   */
  // eslint-disable-next-line class-methods-use-this
  onCollision(collision, target) {
    const entry = SolidTile.collidingObjects.find(({ Cls }) => target instanceof Cls);
    if (entry) {
      const { restitution } = entry;
      const resolution = collision.resolutionVector.scale(-1);

      // eslint-disable-next-line no-param-reassign
      target.transform.position = target.transform.position.add(resolution);

      const normal = resolution.normalized();
      if (target.rigidbody.velocity.dot(normal) <= 0) {
        // Source: http://www.chrishecker.com/images/e/e7/Gdmphys3.pdf
        const j = -(1 + restitution) * target.rigidbody.velocity.dot(normal);
        const impulse = normal.scale(j);

        target.rigidbody.addVelocity(impulse);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get isSolidTile() {
    return true;
  }
}

/**
 * @typedef {{position: import('../shared').Vector, sprite: import('../shared').Sprite}[]} Tiles
 */
class BackgroundTiles extends GameObject {
  /** @type {Tiles} */
  #tiles = [];

  /**
   * @param {Object} props
   * @param {Tiles} props.tiles
   */
  onActivate({ tiles }) {
    this.#tiles = tiles;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    _.each(this.#tiles, (tile) => {
      frame.buffer.draw(tile.position, tile.sprite);
    });
  }
}

class Decoration extends GameObject {
  #sprite = AssetsManager.window;

  /**
   * @param {Object} props
   * @param {Vector} props.initialPos
   * @param {'window' | 'flag'} props.type
   */
  onActivate({ initialPos, type }) {
    this.#sprite = type === 'window' ? AssetsManager.window : AssetsManager.flag;
    this.transform.origin = initialPos ?? Vector.Zero;
  }

  /**
   * @param {import('../shared').Frame} frame
   */
  onUpdate(frame) {
    frame.buffer.draw(this.position, this.#sprite);
  }
}

/**
 * @typedef {Object} LevelInfo Object containing information about a given level.
 * @property {string} map A representation of the map in form of a multiline string,
 * where 'X' encodes a wall, '.' a background, 'S' the start door and 'E' the end door.
 * The map is as wide as the amount of columns in the string and as high as the amount
 * of rows. It should have a rectangular shape.
 * @property {(create: (Cls: Parameters<typeof LevelScene.prototype.create>[0], pos: Vector, otherArgs?: Record<string, any>) => void) => void} [additionalObjects]
 */

class LevelScene extends GameScene {
  #tileSprites = AssetsManager.tileset;

  /** @type {string[][]} */
  // @ts-ignore
  #tiles;

  /** @type {number} */
  // @ts-ignore
  #heightTiles;

  /** @type {number} */
  // @ts-ignore
  #widthTiles;

  /** @type {King?} */
  #king = null;

  get king() {
    return this.#king;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {'solid' | 'background'}
   */
  #getTileType(x, y) {
    if (x < 0 || x >= this.#widthTiles || y < 0 || y >= this.#heightTiles) {
      return 'solid';
    }

    return this.#tiles[y][x] === 'X' ? 'solid' : 'background';
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {import('../../shared').Sprite}
   */
  #getTileSprite(x, y) {
    const neighbours = _.times(3, (row) =>
      _.times(3, (col) => (this.#getTileType(x + col - 1, y + row - 1) === 'solid' ? 'X' : '.')),
    );
    const tileRule = tileRules.find((rule) => patternsMatch(neighbours, rule.pattern)) ?? tileRules[0];

    return this.#tileSprites[tileRule.texturePos.y][tileRule.texturePos.x];
  }

  /**
   * @param {'S' | 'E'} symbol
   * @returns {Vector?} position of special tile in the map
   */
  #findSpecialTile(symbol) {
    for (let y = 0; y < this.#heightTiles; y++) {
      for (let x = 0; x < this.#widthTiles; x++) {
        if (this.#tiles[y][x] === symbol) {
          return new Vector(x, y);
        }
      }
    }

    return null;
  }

  /**
   * @param {LevelInfo} levelInfo
   */
  initialize(levelInfo) {
    this.#tiles = stringToCharMatrix(levelInfo.map);
    this.#heightTiles = this.#tiles.length;
    this.#widthTiles = Math.max(...this.#tiles.map((row) => row.length));

    /** @type {{ position: Vector, sprite: import('../../shared').Sprite }[]} */
    const backgroundTiles = [];

    for (let y = 0; y < this.#heightTiles; y++) {
      for (let x = 0; x < this.#widthTiles; x++) {
        const data = { position: new Vector(x * TILE_SIZE, y * TILE_SIZE), sprite: this.#getTileSprite(x, y) };

        if (this.#getTileType(x, y) === 'solid') {
          this.create(SolidTile, {
            args: data,
          });
        } else {
          backgroundTiles.push(data);
        }
      }
    }

    this.create(BackgroundTiles, { args: { tiles: backgroundTiles } });

    this.create(Door, {
      args: {
        position: this.#findSpecialTile('S')?.scale(TILE_SIZE) ?? Vector.Zero,
        type: 'start',
      },
    });

    if (this.#findSpecialTile('E')) {
      this.create(Door, {
        args: {
          position: this.#findSpecialTile('E')?.scale(TILE_SIZE) ?? Vector.Zero,
          type: 'end',
        },
      });
    }

    if (levelInfo.additionalObjects) {
      levelInfo.additionalObjects((Cls, pos, otherArgs = {}) => {
        this.create(Cls, {
          args: {
            initialPos: pos.add(new Vector(0.5, 0.5)).scale(TILE_SIZE),
            level: this,
            ...otherArgs,
          },
        });
      });
    }

    this.#king = this.create(King, {
      args: {
        position: this.#findSpecialTile('S')?.scale(TILE_SIZE) ?? Vector.Zero,
      },
    });
  }
}

/**
 * Generate an anonymous level class from level info.
 *
 * @param {import('./LevelScene').LevelInfo} levelInfo
 * @returns {typeof LevelScene} level information
 */
function levelFrom(levelInfo) {
  return class extends LevelScene {
    onActivate() {
      super.initialize(levelInfo);
    }
  };
}

const Level1 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXXXXXXXXXXX
  XXX.........X...........X
  XXX.........X...........X
  X.....XX....XXX.........X
  X................XX.....X
  X.E.................XX..X
  XXXXXX....XXXXXXX.......X
  X...........X.........XXX
  X....XXX................X
  X...................X...X
  X.S........XX......XX...X
  XXXX......XXX.......XXXXX
  XXXXXXXXXXXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Decoration, new Vector(6, 1), { type: 'window' });
    create(Decoration, new Vector(14, 9), { type: 'window' });
    create(Decoration, new Vector(16, 9), { type: 'window' });
    create(Decoration, new Vector(17, 2), { type: 'window' });
    create(Decoration, new Vector(20, 3), { type: 'window' });
    create(Decoration, new Vector(22, 1), { type: 'flag' });
    create(Decoration, new Vector(3, 7), { type: 'flag' });
    create(Pig, new Vector(3, 5), { facing: 'right' });
    create(Pig, new Vector(22, 10));
    create(Pig, new Vector(20, 8));
    create(Pig, new Vector(14, 2), { facing: 'right' });
    create(Pig, new Vector(6, 7), { facing: 'right' });
    create(Pig, new Vector(7, 2), { facing: 'right' });
  },
});

const Level2 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXXXXXXXXXXX
  X.......................X
  X.......................X
  X...........X....XX.....X
  X......XXXXXXXXXXXXXX...X
  X.E...................XXX
  XXXX....................X
  X...X.......XXX......XX.X
  X.........X.....XX....X.X
  X......X..X..X..........X
  X...XX.......X......XXXXX
  X.S.X........XX.........X
  XXXXXXXXXXXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Decoration, new Vector(10, 1), { type: 'window' });
    create(Decoration, new Vector(13, 1), { type: 'window' });
    create(Decoration, new Vector(16, 1), { type: 'window' });
    create(Decoration, new Vector(19, 1), { type: 'window' });
    create(Decoration, new Vector(6, 1), { type: 'window' });
    create(Decoration, new Vector(7, 6), { type: 'window' });
    create(Decoration, new Vector(18, 5), { type: 'flag' });
    create(Decoration, new Vector(3, 1), { type: 'flag' });
    create(Pig, new Vector(5, 11), { facing: 'right' });
    create(Pig, new Vector(12, 11));
    create(Pig, new Vector(23, 9));
    create(Pig, new Vector(15, 3), { facing: 'right' });
  },
});

const Level3 = levelFrom({
  map: `
  XXXXXXXXXXXXXXXXXXXXXXXXX
  XXX.......XX............X
  XXX........X............X
  X............XXXXXXXXXXXX
  X.....XXX....X..........X
  X.........XX........XX..X
  X..XX............XX.....X
  X...XX........X.......XXX
  X......XXXXXX..........XX
  X...................X...X
  X.S.......XX.......XX...X
  XXXX.....XXX...XX...XXXXX
  XXXXXXXXXXXXXXXXXXXXXXXXX`,
  additionalObjects: (create) => {
    create(Decoration, new Vector(11, 6), { type: 'window' });
    create(Decoration, new Vector(9, 6), { type: 'window' });
    create(Decoration, new Vector(7, 6), { type: 'window' });
    create(Decoration, new Vector(1, 6), { type: 'flag' });
    create(Pig, new Vector(23, 2), { variant: 'king', facing: 'left' });
    create(Pig, new Vector(13, 10), { facing: 'right' });
    create(Pig, new Vector(20, 2), { facing: 'left' });
    create(Pig, new Vector(18, 2), { facing: 'left' });
    create(Pig, new Vector(16, 2), { facing: 'left' });
    create(Pig, new Vector(22, 10), { facing: 'left' });
    create(Pig, new Vector(19, 9));
    create(Pig, new Vector(14, 6), { facing: 'right' });
  },
});

const scenes = Object.freeze({
  level1: Level1,
  level2: Level2,
  level3: Level3,
});

class GameEngineProxy {
  /**
   * @type {GameEngine<typeof scenes> | undefined}
   */
  #gameEngine;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('../ui').UIProxy} ui
   * @param {Number} level
   */

  initialize(canvas, ui, level) {
    this.#gameEngine = new GameEngine(canvas, ui, scenes);
    this.#gameEngine.load(`level${level}`);
    return this;
  }

  start() {
    this.#gameEngine?.start();
  }

  stop() {
    this.#gameEngine?.stop();
  }

  reset() {
    this.#gameEngine?.reset();
  }
}

const ctx = react.exports.createContext(void 0);
const GameEngineProvider = ({
  children
}) => {
  const [engineProxy] = react.exports.useState(() => new GameEngineProxy());
  return jsx(ctx.Provider, {
    value: engineProxy,
    children
  });
};
function useGameEngine() {
  const value = react.exports.useContext(ctx);
  if (!value) {
    throw new Error("useGameEngine must be used within a GameEngineProvider");
  }
  return value;
}

/** @typedef {{ [x: string]: ThemeType | string }} ThemeType */

/**
 * @template T
 * @typedef {{ readonly [P in keyof T]: DeepReadonly<T[P]> }} DeepReadonly
 */

/**
 * @template {ThemeType} T
 * @param {T} theme
 * @param {string?} prefix
 * @returns {{theme: DeepReadonly<T>, variables: Readonly<Record<string, string>> }}
 */
function transformToCssVariablesThemeImpl(theme, prefix = '-') {
  const cssVarsTheme = /** @type {T} */ ({});
  const variables = /** @type {Record<string, string>} */ ({});
  for (const [key, value] of Object.entries(theme)) {
    const varName = `${prefix}-${key}`;
    if (typeof value === 'object') {
      const { theme: nestedTheme, variables: nestedVars } = transformToCssVariablesThemeImpl(value, varName);
      // @ts-ignore
      cssVarsTheme[key] = nestedTheme;
      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        variables[nestedKey] = nestedValue;
      }
    } else {
      variables[varName] = value;
      // @ts-ignore
      cssVarsTheme[key] = `var(${varName})`;
    }
  }

  return { theme: cssVarsTheme, variables };
}

/**
 * @template {ThemeType} T
 * @param {T} theme
 * @returns {{theme: DeepReadonly<T>, variables: Readonly<Record<string, string>> }}
 */
function transformToCssVariablesTheme(theme) {
  return transformToCssVariablesThemeImpl(theme);
}

const valueTheme = {
  colors: {
    common: {
      white: '#ffffff',
    },
    primary: {
      main: '#facd74',
    },
    text: {
      primary: '#3f3851',
      secondary1: '#92532f',
      secondary2: '#48c38a',
    },
    background: {
      solid: '#3f3851',
      transparent: 'rgba(0, 0, 0, 0.65)',
    },
    gradient: {
      colorful: 'linear-gradient(rgb(250, 205, 116), rgb(72, 195, 138))',
      steel: 'linear-gradient(rgba(255, 255, 255, 1), rgba(102, 102, 102, 1))',
      selectedLevel: 'linear-gradient(rgba(255, 255, 255, 1), rgba(255, 215, 0, 1))',
    },
  },
  transitions: {
    default: 'all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
  },
  fontSize: {
    primary: '1rem',
    btnBigger: '1.08rem',
    btnNormal: '0.85rem',
    headerBig: '2.88rem',
  },
  fontFamily: {
    default: "'Press Start 2P', cursive",
    primary: "'DM Mono', monospace",
  },
};

const { theme, variables } = transformToCssVariablesTheme(valueTheme);

const styles = css`
  :root {
    ${Object.entries(variables).map(([k, v]) => `${k}: ${v};`).join("\n")}
  }
`;
const GlobalStyles = () => jsx(Global, {
  styles
});

class UIProxy {
  #levelWonCb;

  #levelLostCb;

  #gameOverCb;

  /**
   * @param {() => void} onLevelWon
   * @param {() => void} onLevelLost
   * @param {() => void} onGameOver
   */
  constructor(onLevelWon, onLevelLost, onGameOver) {
    this.#levelWonCb = onLevelWon;
    this.#levelLostCb = onLevelLost;
    this.#gameOverCb = onGameOver;
  }

  levelWon() {
    this.#levelWonCb();
  }

  levelLost() {
    this.#levelLostCb();
  }

  gameOver() {
    this.#gameOverCb();
  }
}

var ButtonSilverUrl = "/CodersCamp2021.Project.React/assets/silverButton.c49978e6.png";

var ButtonGoldUrl = "/CodersCamp2021.Project.React/assets/goldButton.5025f2df.png";

const BUTTON_HEIGHT_SIZE = "3.84rem";
const BUTTON_WIDTH_SIZE = "10.2rem";
const BUTTON_FONT_SIZE = "0.8rem";
const Button = ({
  children,
  type,
  onClick
}) => {
  return jsx("button", {
    type: "button",
    css: {
      width: BUTTON_WIDTH_SIZE,
      height: BUTTON_HEIGHT_SIZE,
      background: `url(${type === "silver" ? ButtonSilverUrl : ButtonGoldUrl}) center center / cover`,
      color: theme.colors.common.white,
      fontSize: BUTTON_FONT_SIZE,
      textTransform: type === "gold" ? "uppercase" : "none",
      "&:hover": {
        color: theme.colors.primary.main
      }
    },
    onClick,
    children
  });
};

const container = css`
  display: flex;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const devImage = css`
  height: 3.08rem;
  width: auto;
  margin-right: 1.85rem;
`;
const infoContainer$1 = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${theme.fontFamily.primary};
`;
const DevInfo = ({
  image,
  name,
  devRole,
  special = false
}) => {
  return jsxs("div", {
    css: container,
    children: [jsx("img", {
      src: image,
      alt: name,
      css: devImage
    }), jsxs("div", {
      css: infoContainer$1,
      children: [jsx("h2", {
        css: {
          WebkitTextStroke: special ? `0.04rem ${theme.colors.text.secondary2}` : `0.04rem ${theme.colors.text.secondary1}`
        },
        children: name
      }), jsx("p", {
        children: devRole
      })]
    })]
  });
};

var levelButtonUrl = "/CodersCamp2021.Project.React/assets/levelButton.cfe22784.png";

var levelButtonSelectedUrl = "/CodersCamp2021.Project.React/assets/levelButtonSelected.4dfe17f7.png";

const LEVEL_BUTTON_SIZE = "4rem";
const LevelButton = ({
  children,
  type
}) => {
  return jsx("button", {
    type: "button",
    css: {
      width: LEVEL_BUTTON_SIZE,
      height: LEVEL_BUTTON_SIZE,
      background: `url(${levelButtonUrl}) center center / cover`,
      color: theme.colors.common.white,
      opacity: type === "locked" ? "0.25" : "0.9",
      transition: "opacity 0.25s",
      "&:hover": {
        opacity: type === "locked" ? "0.25" : "1",
        color: type === "unlocked" ? theme.colors.primary.main : null,
        background: type === "unlocked" ? `url(${levelButtonSelectedUrl}) center center / cover` : null
      }
    },
    disabled: type === "locked",
    children
  });
};

var kingUrl = "/CodersCamp2021.Project.React/assets/king.6a7dd5c4.svg";

var pigUrl = "/CodersCamp2021.Project.React/assets/pig.efec78b6.svg";

const header = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const sideImg = css`
  height: 3rem;
  width: auto;
`;
const centerSection = css`
  background: ${theme.colors.gradient.colorful};
  background-clip: text;
  text-fill-color: transparent;
  -webkit-text-stroke: 0.0625em ${theme.colors.text.primary};
  text-align: center;

  font-size: 2rem;
  line-height: 3rem;

  @media screen and (max-width: 576px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;
const PageHeader = ({
  children
}) => {
  return jsxs("header", {
    css: header,
    children: [jsx("img", {
      src: kingUrl,
      alt: "",
      css: sideImg
    }), jsx("h1", {
      css: centerSection,
      children
    }), jsx("img", {
      src: pigUrl,
      alt: "",
      css: sideImg
    })]
  });
};

var closeButtonUrl = "/CodersCamp2021.Project.React/assets/closeButton.c35c2363.jpg";

const CLOSE_BUTTON_BORDER_WIDTH = "10px";
const btn = css({
  width: "3.9rem",
  height: "3.9rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `${CLOSE_BUTTON_BORDER_WIDTH} solid`,
  borderImageSlice: 1,
  borderImageSource: theme.colors.gradient.steel,
  background: `url(${closeButtonUrl}) center center / cover`,
  svg: {
    path: {
      transition: theme.transitions.default
    }
  },
  "&:hover": {
    borderImageSource: theme.colors.gradient.selectedLevel,
    svg: {
      path: {
        fill: theme.colors.primary.main,
        transition: theme.transitions.default
      }
    }
  }
});
const CloseButton = ({
  onClose
}) => {
  return jsx("button", {
    onClick: onClose,
    type: "button",
    css: btn,
    "aria-label": "Close",
    children: jsx("svg", {
      width: "1.2rem",
      height: "1.2rem",
      viewBox: "0 0 33 33",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: jsx("path", {
        d: "M32.8802 3.39883L29.572 0.0905762L16.4563 13.2063L3.3406 0.0905762L0.0323486 3.39883L13.148 16.5145L0.0323486 29.6302L3.3406 32.9385L16.4563 19.8228L29.572 32.9385L32.8802 29.6302L19.7646 16.5145L32.8802 3.39883Z",
        fill: "white"
      })
    })
  });
};

var steelDecorationUrl = "/CodersCamp2021.Project.React/assets/stealDecoration.8abf2779.svg";

const POPUP_INNER_BORDER_WIDTH = "10px";
const decoration = css({
  position: "absolute",
  zIndex: 1
});
const decoOne = css({
  top: `-${POPUP_INNER_BORDER_WIDTH}`,
  left: "50%",
  transform: "translate(-50%, -50%) rotate(-90deg)"
});
const decoTwo = css({
  top: "50%",
  right: `-${POPUP_INNER_BORDER_WIDTH}`,
  transform: "translate(50%, -50%)"
});
const decoThree = css({
  bottom: `-${POPUP_INNER_BORDER_WIDTH}`,
  left: "50%",
  transform: "translate(-50%, 50%) rotate(-90deg)"
});
const decoFour = css({
  top: "50%",
  left: `-${POPUP_INNER_BORDER_WIDTH}`,
  transform: "translate(-50%, -50%)"
});
const btnContainer = css({
  position: "absolute",
  right: `-${POPUP_INNER_BORDER_WIDTH}`,
  top: `-${POPUP_INNER_BORDER_WIDTH}`,
  zIndex: 1
});
const popupContainer = css({
  position: "fixed",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.background.transparent,
  transition: theme.transitions.default,
  overflowY: "auto"
});
const popupInnerControls = css({
  position: "relative",
  width: "clamp(1160px, 60vw, 1920px)",
  border: `${POPUP_INNER_BORDER_WIDTH} solid`,
  borderImageSlice: 1,
  borderImageSource: theme.colors.gradient.steel,
  backgroundColor: theme.colors.primary.main,
  margin: "5rem 0",
  "@media (max-width: 1200px)": {
    width: "94%"
  }
});
const popupInnerLevelEnd = css({
  position: "relative",
  width: "clamp(500px, 60vw, 660px)",
  border: `${POPUP_INNER_BORDER_WIDTH} solid`,
  borderImageSlice: 1,
  borderImageSource: theme.colors.gradient.steel,
  backgroundColor: theme.colors.primary.main,
  margin: "5rem 0"
});
const Popup = ({
  open,
  children,
  onClose,
  variant
}) => {
  const popupRef = react.exports.useRef();
  const portal = react.exports.useMemo(() => document.createElement("div"), []);
  react.exports.useEffect(() => {
    document.body?.appendChild(portal);
    return () => {
      document.body?.removeChild(portal);
    };
  }, [portal]);
  if (!open)
    return null;
  return ReactDOM.createPortal(jsx("div", {
    role: "dialog",
    "aria-hidden": "true",
    css: popupContainer,
    ref: popupRef,
    onClick: (e) => popupRef.current === e.target ? onClose() : "",
    children: variant === "Control" ? jsxs("div", {
      css: popupInnerControls,
      children: [jsx("img", {
        src: steelDecorationUrl,
        css: [decoOne, decoration],
        alt: ""
      }), jsx("img", {
        src: steelDecorationUrl,
        css: [decoTwo, decoration],
        alt: ""
      }), jsx("img", {
        src: steelDecorationUrl,
        css: [decoThree, decoration],
        alt: ""
      }), jsx("img", {
        src: steelDecorationUrl,
        css: [decoFour, decoration],
        alt: ""
      }), jsx("div", {
        css: btnContainer,
        children: jsx(CloseButton, {
          onClose
        })
      }), jsx("div", {
        children
      })]
    }) : jsxs("div", {
      css: popupInnerLevelEnd,
      children: [jsx("img", {
        src: steelDecorationUrl,
        css: [decoTwo, decoration],
        alt: ""
      }), jsx("img", {
        src: steelDecorationUrl,
        css: [decoFour, decoration],
        alt: ""
      }), jsx("div", {
        children
      })]
    })
  }), portal);
};

var keyboardArrowsUrl = "data:image/png;base64,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";

var jumpUrl = "data:image/png;base64,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";

var groundUrl = "data:image/png;base64,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";

var keyXUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXCAYAAABxyNlsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMISURBVHgB7Z09iipBFIXvPF40M5kKugADQxPNXIRrMBN/wMDIyMhQ3YGxuAfNBNHQwAUoaKaYKLzHncGmuv2rJ31e6/T5QJiarhL8pufU7WqpfhORP0Ig/BICg3KBUC6Q3zadcrmcfH5+Cvlmt9vJaDS62+9NLCa0wWAgiURCyDfL5VLy+fzdfowFIJQLhHKBnGWuTl7VatXVqdlsymq1ctrpdFoajYaEhXq9LovFwmnHYjEpFAquPr1eTyaTiet3Z9WCVgXeyUvFaoifCNvktt1uXZ//eDxKNBp19Xl/fz8bx1gAQrlArC4iksmkxONxp60/T6dTCQuRSERSqZTT1sy1wUpuq9VytVVssViUsKCTtynXFsYCEMoFQrlArDLXBl3IyGaz8uqMx+OvhSo/8E2uirVZKXoF/JLLWABCuUAoFwjlAqFcIJQLhHKBUC4QygXi2xXav6JrxNcw71fdotvtSqfTuXisXC5LqVSSIOGZC4RygVAuEMoFQrlAKBdIYKWYWW55SyqzTPOWVH6UcP8LnrlAKBdIYLFgkslkvv79T5gRoTcMr6H37Z75puhTyPVK8sq9JljHBH2JewvGAhDKBfIUcrUU0xLr9DLRLNYS6/Qy0fi4Nu4Z4JkLhHKBBFYtaBSc8FYDZlmmZdq1Y95KwnxPHRd0mRaY3Gt3EJRb5ZX3mCnXfE/9IwQtl7EAhHKBUC4QygVCuUACqxbMkupRvKtp3mNBE5hcP1aznn3JkbEAhHKBUC4QygVCuUAoFwjlAqFcIJQLhHKBUC4QygVCuUB8WxW79YW5V8LPz+GbXN1dw68dNn4KjAUglAuEcoFYZa53/1zd2zBM++cOh0Pp9/tOW7dzrdVqd8dZyZ3NZq79Y3Vfw0f2NnxVVOx8PnfathtlMhaAUC6Qs1jQB0yYEaDoFtKHw8Fpf3x8SJjQGFiv105bfWw2G1ef/X5/Ns7qIRztdts6Z8KAiq5UKnf7MRaAUC4QygViVefqAybCNond4tLkdQmrCY08BmMBCOUCoVwgfwFL1NioHwX3rQAAAABJRU5ErkJggg==";

var attackUrl = "/CodersCamp2021.Project.React/assets/attack.862e9b21.png";

const heading1 = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: BUTTON_WIDTH_SIZE,
  height: BUTTON_HEIGHT_SIZE,
  background: `url(${ButtonSilverUrl}) center center / cover`,
  color: theme.colors.common.white,
  fontSize: BUTTON_FONT_SIZE,
  position: "absolute",
  top: "0",
  transform: "translateY(-50%)",
  left: `-${POPUP_INNER_BORDER_WIDTH}`,
  zIndex: 1
});
const heading2 = css({
  fontSize: theme.fontSize.btnBigger,
  color: theme.colors.text.primary,
  width: "100%",
  textAlign: "left"
});
const deco = css({
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
});
const text = css({
  fontFamily: theme.fontFamily.primary,
  fontSize: theme.fontSize.primary,
  color: theme.colors.text.primary,
  textAlign: "center"
});
const content = css({
  display: "flex",
  gap: POPUP_INNER_BORDER_WIDTH,
  position: "relative",
  "&:after": {
    content: '""',
    width: POPUP_INNER_BORDER_WIDTH,
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    transform: "translateX(-50%)",
    background: theme.colors.gradient.steel,
    "@media (max-width: 1024px)": {
      left: 0,
      right: 0,
      top: "50%",
      width: "auto",
      height: POPUP_INNER_BORDER_WIDTH,
      transform: "translateY(-50%)"
    }
  },
  "& > *": {
    flex: 1,
    padding: "4rem 2rem 3rem 2rem"
  },
  "@media (max-width: 1024px)": {
    flexDirection: "column"
  }
});
const innerWrapper1 = css({
  position: "relative",
  display: "inline-block",
  margin: "2rem auto 0 auto",
  "& > div": {
    position: "absolute"
  }
});
const col = css({
  textAlign: "center"
});
const innerWrapper2 = css({
  height: "100%",
  display: "inline-flex",
  justifyContent: "center"
});
const image1 = css({
  padding: "3.5rem 5.7rem",
  "@media (max-width: 1440px)": {
    padding: "5rem 7rem"
  },
  "@media (max-width: 768px)": {
    padding: "3rem 6rem"
  }
});
const description = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem"
});
const keyLeftDescription = css({
  left: 0,
  top: "50%",
  transform: "translateY(-50%)"
});
const keyRightDescription = css({
  right: 0,
  top: "50%",
  transform: "translateY(-50%)"
});
const keyUpDescription = css({
  top: 0,
  left: "50%",
  transform: "translateX(-50%)"
});
const keyDownDescription = css({
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)"
});
const exampleImg = css({
  "@media (max-width: 768px)": {
    display: "none"
  }
});
const PopupControls = ({
  open,
  onClose
}) => {
  return jsxs(Popup, {
    open,
    onClose,
    variant: "Control",
    children: [jsx("img", {
      src: steelDecorationUrl,
      css: [deco, decoration],
      alt: ""
    }), jsx("div", {
      css: heading1,
      children: "Controls"
    }), jsxs("div", {
      css: content,
      children: [jsxs("div", {
        css: col,
        children: [jsx("h2", {
          css: heading2,
          children: "Movement"
        }), jsxs("div", {
          css: innerWrapper1,
          children: [jsx("div", {
            css: [keyLeftDescription, description],
            children: jsxs("p", {
              css: text,
              children: ["Move", jsx("br", {}), "to left"]
            })
          }), jsx("div", {
            css: [keyRightDescription, description],
            children: jsxs("p", {
              css: text,
              children: ["Move ", jsx("br", {}), "to right"]
            })
          }), jsxs("div", {
            css: [keyUpDescription, description],
            children: [jsx("img", {
              src: jumpUrl,
              css: exampleImg,
              alt: ""
            }), jsx("p", {
              css: text,
              children: "Jump"
            })]
          }), jsxs("div", {
            css: [keyDownDescription, description],
            children: [jsx("img", {
              src: groundUrl,
              css: exampleImg,
              alt: ""
            }), jsx("p", {
              css: text,
              children: "Crouch"
            })]
          }), jsx("img", {
            css: image1,
            src: keyboardArrowsUrl,
            alt: ""
          })]
        })]
      }), jsxs("div", {
        css: col,
        children: [jsx("h2", {
          css: heading2,
          children: "Action"
        }), jsx("div", {
          css: innerWrapper2,
          children: jsxs("div", {
            css: description,
            children: [jsx("img", {
              src: keyXUrl,
              alt: ""
            }), jsx("p", {
              css: text,
              children: "Attack"
            }), jsx("img", {
              src: attackUrl,
              css: exampleImg,
              alt: ""
            })]
          })
        })]
      })]
    })]
  });
};

var defeatPopup = "/CodersCamp2021.Project.React/assets/defeatPopup.c2e557c9.png";

var victoryPopup = "/CodersCamp2021.Project.React/assets/victoryPopup.d821d65d.png";

var gameOverPopup = "/CodersCamp2021.Project.React/assets/gameOverPopup.24938c0c.png";

const box = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const img = css`
  width: 17.5rem;
  margin-bottom: 3rem;
  margin-top: 2rem;
`;
const button = css`
  flex-direction: column;
  margin-bottom: 1rem;
`;
const PopupLevel = ({
  open,
  onClick,
  variant,
  nextLevel,
  path
}) => {
  let showImg;
  let buttonText;
  let altText;
  if (variant === "victory") {
    showImg = victoryPopup;
    buttonText = "next";
    altText = "victory";
  }
  if (variant === "defeat") {
    showImg = defeatPopup;
    buttonText = "retry";
    altText = "defeat";
  }
  if (variant === "gameOver") {
    showImg = gameOverPopup;
    buttonText = "homepage";
    altText = "victory";
  }
  return jsx(Popup, {
    open,
    onClose: () => {
    },
    variant: "LevelPopup",
    children: jsxs("div", {
      css: box,
      children: [jsx("img", {
        css: img,
        src: showImg,
        alt: altText
      }), jsx("div", {
        css: button,
        children: jsx(Link, {
          to: path,
          children: jsx(Button, {
            onClick,
            type: "gold",
            children: buttonText
          })
        }, nextLevel)
      })]
    })
  });
};

var backgroundUrl = "/CodersCamp2021.Project.React/assets/background.3d765d18.jpg";

function getLocalStorage() {
  if (localStorage.getItem('levels') === null) {
    localStorage.setItem('levels', JSON.stringify({ 1: 'unlocked' }));
  }
  return JSON.parse(localStorage.getItem('levels') || '{}');
}

/**
 * @param {{levelNumber: number}} props
 * @return {'locked' | 'unlocked'}
 */

function checkLevelState({ levelNumber }) {
  const localStorageData = getLocalStorage();
  return localStorageData[levelNumber] ?? 'locked';
}
/**
 * @param {{levelNumber: number}} props
 */
function unlockedLevel({ levelNumber }) {
  const localStorageData = getLocalStorage();
  localStorageData[levelNumber] = 'unlocked';
  localStorage.setItem('levels', JSON.stringify(localStorageData));
}

const LEVEL_GRID_SPACING = "2rem";
const levels = Object.values(scenes).filter((scene) => scene.prototype instanceof LevelScene);
const wrapper$4 = css`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;
const levelGrid = css`
  position: relative;
  width: 100%;
  max-width: max(min(50vw, 1000px), 500px);
  max-height: 50vh;
  padding: ${LEVEL_GRID_SPACING} ${LEVEL_GRID_SPACING} 5rem;
  border: 1rem solid ${theme.colors.primary.main};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${LEVEL_BUTTON_SIZE}, 1fr));
  gap: ${LEVEL_GRID_SPACING};
  place-items: center;
  background: ${theme.colors.background.transparent};
`;
const buttonWrapper$2 = css`
  position: absolute;
  width: ${BUTTON_WIDTH_SIZE};
  margin-left: auto;
  margin-right: auto;
  bottom: calc(-${BUTTON_HEIGHT_SIZE} / 2 - 1rem);
  left: 0;
  right: 0;
`;
const LevelSelectPage = () => {
  return jsxs("main", {
    css: wrapper$4,
    children: [jsx(PageHeader, {
      children: "Level Select"
    }), jsxs("section", {
      css: levelGrid,
      children: [levels.map((_, i) => {
        const levelNumber = i + 1;
        return jsx(Link, {
          to: `/level-select/${levelNumber}`,
          children: jsx(LevelButton, {
            type: checkLevelState({
              levelNumber
            }),
            children: levelNumber
          })
        }, levelNumber);
      }), jsx("div", {
        css: buttonWrapper$2,
        children: jsx(Link, {
          to: "/",
          children: jsx(Button, {
            type: "silver",
            children: "go back to homepage"
          })
        })
      })]
    })]
  });
};

const wrapper$3 = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;
const btnGroup = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 3rem;
  gap: 3rem;
`;
const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return jsxs("main", {
    css: wrapper$3,
    children: [jsx(PageHeader, {
      children: "King and Pigs"
    }), jsxs("section", {
      css: btnGroup,
      children: [jsx(Link, {
        to: "/level-select",
        children: jsx(Button, {
          type: "gold",
          children: "start"
        })
      }), jsx(Button, {
        type: "silver",
        onClick: handleOpen,
        children: "Controls"
      }), jsx(Link, {
        to: "/credits",
        children: jsx(Button, {
          type: "silver",
          children: "Credits"
        })
      }), jsx(PopupControls, {
        open,
        onClose: handleClose
      })]
    })]
  });
};

const wrapper$2 = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;
const gameBorder = css`
  position: relative;
  border: 1rem solid ${theme.colors.primary.main};
  margin-bottom: calc(${BUTTON_HEIGHT_SIZE} + 0.9rem);
`;
const buttonWrapper$1 = css`
  position: absolute;
  width: ${BUTTON_WIDTH_SIZE};
  margin-left: auto;
  margin-right: auto;
  bottom: calc(-${BUTTON_HEIGHT_SIZE} / 2 - 1.9rem);
  left: 0;
  right: 0;
`;
const GameUI = () => {
  const gameEngine = useGameEngine();
  const params = useParams();
  const navigate = useNavigate();
  const [variant, setVariant] = react.exports.useState("playing");
  const open = variant !== "playing";
  const selectedLevel = Number(params.levelSelectId);
  const nextLevel = variant === "victory" ? selectedLevel + 1 : selectedLevel;
  const path = variant === "victory" || variant === "defeat" ? `/level-select/${nextLevel}` : "/";
  const handleClick = () => {
    setVariant("playing");
    navigate(path);
    setTimeout(() => {
      gameEngine.reset();
      gameEngine.start();
    }, 0);
  };
  react.exports.useEffect(() => {
    gameEngine.start();
    return () => gameEngine.stop();
  }, [gameEngine]);
  const ref = react.exports.useRef(null);
  const uiProxy = react.exports.useMemo(() => new UIProxy(() => {
    gameEngine.stop();
    unlockedLevel({
      levelNumber: selectedLevel + 1
    });
    setVariant("victory");
  }, () => {
    gameEngine.stop();
    setVariant("defeat");
  }, () => {
    gameEngine.stop();
    setVariant("gameOver");
  }), [gameEngine, selectedLevel]);
  const levelsAvailable = react.exports.useCallback(() => {
    const levelsArray = _.range(1, _.size(getLocalStorage()) + 1);
    return levelsArray.includes(selectedLevel);
  }, [selectedLevel]);
  react.exports.useLayoutEffect(() => {
    if (ref.current && levelsAvailable()) {
      gameEngine.initialize(ref.current, uiProxy, selectedLevel);
    }
  }, [gameEngine, uiProxy, selectedLevel, levelsAvailable]);
  return jsxs(Fragment, {
    children: [!levelsAvailable() ? jsx(Navigate, {
      to: "/level-select",
      replace: true
    }) : "", jsxs("main", {
      css: wrapper$2,
      children: [jsxs(PageHeader, {
        children: ["Level ", params.levelSelectId]
      }), " ", jsxs("section", {
        css: gameBorder,
        children: [jsx("canvas", {
          css: {
            width: "65vw"
          },
          height: 416,
          width: 800,
          id: "GameCanvas",
          ref
        }), jsx("div", {
          css: buttonWrapper$1,
          children: jsx(Link, {
            to: "/level-select",
            children: jsxs(Button, {
              type: "silver",
              children: ["change ", jsx("br", {}), "level"]
            })
          })
        })]
      })]
    }), jsx(PopupLevel, {
      open,
      onClick: handleClick,
      variant,
      nextLevel,
      path
    })]
  });
};

const wrapper$1 = css`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;
const NotFound = () => {
  return jsxs("main", {
    css: wrapper$1,
    children: [jsx("h1", {
      css: css`
          padding-bottom: 2rem;
        `,
      children: "Sorry, there's nothing here"
    }), jsx(Link, {
      to: "/",
      children: jsx(Button, {
        type: "silver",
        children: "go back to homepage"
      })
    })]
  });
};

var mmUrl = "/CodersCamp2021.Project.React/assets/mm_pixel.1a3c7022.png";

var jsUrl = "/CodersCamp2021.Project.React/assets/js_pixel.2bafc717.png";

var tcUrl = "/CodersCamp2021.Project.React/assets/tc_pixel.bb79644f.png";

var kdUrl = "/CodersCamp2021.Project.React/assets/kd_pixel.0c586371.png";

var hkUrl = "/CodersCamp2021.Project.React/assets/hk_pixel.145ce177.png";

var logoUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAAAdCAYAAACg9iDSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYoSURBVHgB7ZxfTttIGMC/GTsRaPchewLMCQgrsdI+bThB4QQLJ2gQ5JnwXLqkJyCcgPYEeJ9WomWTPUGnJ2iQKkGT2LPfJIbak7E9dpw/wPwky/H4m8/z75v/EwBDBM75Zx7lHAyGBWFDRrDAOnirQXZ6eDFCSBcMBoMWmQwUjfMYb02YAtTRRCM9AcPS8+26Xi3b9hnwXBUyQhihvF3aPDX5nROSRVh0//DmSM6iRewleKviVZHcfkEjTfKzMBRxbGNY9+EF0v901MESUoUp6Xtk8+ff3pieUw6ydnEd6fkDFt6dJA+ixcTbseQsMt0Fw3IjGycnXW8w2E3yYpWsOhDyOuxWBk/oMQaag8xjUImvYHg5EL+7+nuLJYnc3TS6FvaJDcUwrYEWBra0ohssWuMKTHaJk2B4udiSswTdQq+Told0ud9DBlBvDdRdeEj5jpgsex+jsy7p6wpZxbd66N4K+XtIPwcKCMc84J165f4+Pe1EpaCSVVUWcXJ3/9QdSGFlBdN0s9WL05MkX2Q4HmTFfWkMFOmAfuGaAAvoNhY2V+Eu9OqOo4415aaeMEP/olLZVrwS3UMn9NxG2Vd435PkGF6tQJeQv4Ic6Yd+RQWwCXOm32m8Hvi8aZXTDbR/02ADznsoG8rHUYW8PiE7tOsoF8nH/r9Hrs5E18DHq3PUDH6LsGnJqybB7v3SjlWOLtGhbIv7UAcNRJz7HuwuhYEGrYMjObswLoQqHlqLMH+CNK4NtTphGMSPfx3QX0JqSs9pLXANonGsYfjW0Di+QDIPvQomuYef90A//RyIxrGK4ajOc/lLtC5onK3JN3G9IL+C418Hcn9QxDdO96hy+/Hkj/IV85LjRXs68t+uGx90JsHGxpkQRyCV8HfKNpzNw0BFoWWSm/zsKPztJRVeLFSixail6FCxm1QYY2aqZRnV+5NwlzPGz2fJWbQAaQYqMm0fdbcTZBzpuRfTOj90hb8qvlEMPmeASythJ4/4LPx8j9+zZG8+HKxsvYlNP2wFr/Iu93j94Xrc2Pn7p8MdTKvLsBuhgEtDbw9U8ncfj2oWHfVWHtGdBEubzR7cHF5yCE26YqU0cwMNjGFutbMGs5rY6sFscFOMU0VsWMTyFhopzIrVrVMXcszQU+4nph/3+RcMO+QKU8LEFuWYHpJaPvD/i5MHe8jAz2c2P9l+YtnzOdzKUVymMahBDYPiaUvPs6pcDFNiDPQF8lI3XjxFKBieA3ILWNyY0rBQTAtaHOcLPPnCpOdKsLyk03V9t8i1UEMyxkCfB22YXD/VXfutxa0hGxbPzA0UM38PxmuUYQ6e4bEzMS2ftSUqZHImOHiwHqz7piEM90zh5kIBDHAZglMeyW/P9y5Wt1ouGDIzjxbUgcnF/+c4RuolbTecB5qtoIuGLBtoYfkxpMSxpF1PFqd/gyEX9ujMn2U9nj4glLPS5l/m/F7BBBsE5G5nt4hjd4HuiJEturIwFINdtkqX4e1L3Cdw//HodmXrtAWGIhHGeSW5OVBMN7cO0X3EDBT7VA1PDyrvLRw5Ur4BBoNh4Uw7Bq1qTEzkNfZdcdIi5p3ozjmS2y3MRq8KVau3kZIWr2B2yOFxEsJS0fCvhhCnf92oet4gVt4GviZvJOQ0vRtPSnQj6SgWoWTjqR8z/c7JLsYxdiKRUrIm78K0x7v2STTTOI0r7C5IJyFgstuWBlNMZohAy2uIZ5ANVcSFIYrCUZlC7wTBflYXomlRDy5dmMZJFl1UFU6WfFEXGgLRY1rit8U7lhVfr6tsyB94kfCtbrZY/+YwUu7ESQ+rbNczKX5iUFH2ynZs+ZvYIs05s32fn1Aqxi9BYo3/1iJu/Cm2iDXx+gPywWC8HBEhKPDirzTktTxdLlQbygO9+xn0XsA4bmHZuMpK6D2HfOFloEiH0DvQ+P4josILxTPLjKyovC7iJpQ8Mty3fPsSiBgGkRwzvYRh+Xqn2qze97ztMrXPtf7ziINL6KgA1+AJg+HHtBZne9PSEhvNkR0O9/MdDzAYDInc3TT2LIjuLCthRUd+fZup12T24hoMS4wxUINhiTEGajAsMWazvMEwA0b/EEEoi7pmn4r+H/yVkGhZuzeKAAAAAElFTkSuQmCC";

const wrapper = css`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.background.solid} url(${backgroundUrl}) center center / cover;
`;
const credits = css`
  position: relative;
  max-width: max(70vw, 850px);
  border: 1rem solid ${theme.colors.primary.main};
  background: ${theme.colors.background.transparent};
`;
const infoContainer = css`
  margin: 1.85rem 2.54rem 3.54rem 2.54rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    flex-direction: column;
  }
`;
const info = css`
  :not(:last-child) {
    margin-right: 1rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    :not(:last-child) {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;
const thanks = css`
  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
  font-family: ${theme.fontFamily.primary};
  line-height: 1.6;

  h2 {
    -webkit-text-stroke: 0.04rem ${theme.colors.text.secondary2};
  }
  img {
    margin: 0.5rem 0;
  }
  a {
    color: ${theme.colors.primary.main};
    text-decoration: underline;
  }
`;
const buttonWrapper = css`
  position: absolute;
  width: ${BUTTON_WIDTH_SIZE};
  margin-left: auto;
  margin-right: auto;
  bottom: calc(-${BUTTON_HEIGHT_SIZE} / 2 - 1rem);
  left: 0;
  right: 0;
`;
const CreditsPage = () => {
  return jsxs("main", {
    css: wrapper,
    children: [jsx(PageHeader, {
      children: "Credits"
    }), jsxs("section", {
      css: credits,
      children: [jsxs("div", {
        css: infoContainer,
        children: [jsxs("div", {
          css: info,
          children: [jsx(DevInfo, {
            image: mmUrl,
            name: "Marta Mejer",
            devRole: "Tech lead, Programmer"
          }), jsx(DevInfo, {
            image: jsUrl,
            name: "Justyna Skrajna",
            devRole: "Game designer, Programmer"
          }), jsx(DevInfo, {
            image: tcUrl,
            name: "Tomasz Chojnacki",
            devRole: "Project manager, Programmer"
          }), jsx(DevInfo, {
            image: kdUrl,
            name: "Kamil Dudek",
            devRole: "Scrum master, Programmer"
          })]
        }), jsxs("div", {
          css: info,
          children: [jsx(DevInfo, {
            image: hkUrl,
            name: "Hubert Kawa\u0142ek",
            devRole: "Game coordinator, Programmer",
            special: true
          }), jsxs("div", {
            css: thanks,
            children: [jsx("h2", {
              children: "Special thanks to"
            }), jsx("img", {
              src: logoUrl,
              alt: "Coders Camp Logo"
            }), jsx("p", {
              children: "for learning experience"
            })]
          }), jsxs("div", {
            css: thanks,
            children: [jsx("h2", {
              children: "Many thanks to assets author"
            }), jsx("a", {
              href: "https://pixelfrog-assets.itch.io/kings-and-pigs",
              target: "_blank",
              rel: "noreferrer",
              children: "Author's page"
            }), jsx("br", {}), jsx("a", {
              href: "https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React",
              target: "_blank",
              rel: "noreferrer",
              children: "Repository page"
            })]
          })]
        })]
      }), jsx("div", {
        css: buttonWrapper,
        children: jsx(Link, {
          to: "/",
          children: jsx(Button, {
            type: "silver",
            children: "go back to homepage"
          })
        })
      })]
    })]
  });
};

var index = '';

const githubPrefix = "/CodersCamp2021.Project.React" ;
const App = () => {
  return jsxs(Fragment, {
    children: [jsx(GlobalStyles, {}), jsx(BrowserRouter, {
      basename: githubPrefix,
      children: jsxs(Routes, {
        children: [jsx(Route, {
          path: "/",
          element: jsx(HomePage, {})
        }), jsx(Route, {
          path: "/level-select",
          element: jsx(LevelSelectPage, {})
        }), jsx(Route, {
          path: "/level-select/:levelSelectId",
          element: jsx(GameEngineProvider, {
            children: jsx(GameUI, {})
          })
        }), jsx(Route, {
          path: "/credits",
          element: jsx(CreditsPage, {})
        }), jsx(Route, {
          path: "*",
          element: jsx(NotFound, {})
        })]
      })
    })]
  });
};
ReactDOM.render(jsx(React.StrictMode, {
  children: jsx(App, {})
}), document.getElementById("root"));
