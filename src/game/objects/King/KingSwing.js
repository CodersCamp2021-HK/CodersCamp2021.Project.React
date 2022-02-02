import { KING_ATTACK_SIZE } from '../../config';
import { BoxCollider, GameObject } from '../../engine';
import { Vector } from '../../shared';

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

export { KingSwing };
