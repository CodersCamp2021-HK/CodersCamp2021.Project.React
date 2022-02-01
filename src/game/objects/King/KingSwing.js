import { BoxCollider, GameObject } from '../../engine';
import { Vector } from '../../shared';

const KING_SWING_SIZE = new Vector(64, 48);

class KingSwing extends GameObject {
  /**
   * @param {{ attackCenter: Vector }} args
   */
  onActivate({ attackCenter }) {
    this.transform.origin = attackCenter ?? Vector.Zero;
    this.transform.width = KING_SWING_SIZE.x;
    this.transform.height = KING_SWING_SIZE.y;
    this.setCollider(BoxCollider, [KING_SWING_SIZE]);
  }

  onUpdate() {
    this.destroy(this);
  }
}

export { KingSwing };
