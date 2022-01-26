import { Vector } from '../shared/Vector';

/**
 * @param {import('.').GameObject} object
 * @param {import('../objects').SolidTile} solid
 * @param {number} restitution https://en.wikipedia.org/wiki/Coefficient_of_restitution
 * @return {Vector} normal vector from the solid to the object
 */
const resolveCollisionsWithSolid = (object, solid, restitution) => {
  const pigLines = /** @type {import('.').BoxCollider} */ (object.collider).lines;
  const boxLines = /** @type {import('.').BoxCollider} */ (solid.collider).lines;
  const fromBoxToPig = object.transform.origin.subtract(solid.transform.origin);

  // Source: http://blog.meltinglogic.com/2015/04/aabb-overlapping-area/
  const xOverlap = Math.min(pigLines[0][1], boxLines[0][1]) - Math.max(pigLines[0][0], boxLines[0][0]);
  const yOverlap = Math.min(pigLines[1][1], boxLines[1][1]) - Math.max(pigLines[1][0], boxLines[1][0]);

  const resolutionOffset =
    xOverlap < yOverlap
      ? new Vector(Math.sign(fromBoxToPig.x) * xOverlap, 0)
      : new Vector(0, Math.sign(fromBoxToPig.y) * yOverlap);

  // eslint-disable-next-line no-param-reassign
  object.transform.position = object.transform.position.add(resolutionOffset);

  const normal = resolutionOffset.normalized();
  if (object.rigidbody.velocity.dot(normal) <= 0) {
    // Source: http://www.chrishecker.com/images/e/e7/Gdmphys3.pdf
    const j = -(1 + restitution) * object.rigidbody.velocity.dot(normal);
    const impulse = normal.scale(j);

    object.rigidbody.addVelocity(impulse);
  }

  return normal;
};

export { resolveCollisionsWithSolid };
