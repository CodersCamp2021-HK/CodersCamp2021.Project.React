/**
 * @param {import('.').GameObject} object
 * @param {import('../shared').Vector} resolutionOffset
 * @param {number} restitution https://en.wikipedia.org/wiki/Coefficient_of_restitution
 * @return {import('../shared').Vector} normal vector from the solid to the object
 */
const resolveCollisionsWithSolid = (object, resolutionOffset, restitution) => {
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
