import { describe, expect, test } from 'vitest';
import { CollidableObject } from './collidable-object.class';

function generateCollidableObjects(x, y, width, height) {
  const co = new CollidableObject();
  co.x = x;
  co.y = y;
  co.width = width;
  co.height = height;

  return co;
}

describe('CollidableObject', () => {
  const a = generateCollidableObjects(0, 0, 50, 50);

  test('check object dimensions and positions', () => {
    expect(a.getHitBoxWidth()).toEqual(50);
    expect(a.getHitBoxHeight()).toEqual(50);
    expect(a.getHitBoxRightPos()).toEqual(50);
    expect(a.getHitBoxLeftPos()).toEqual(0);
    expect(a.getHitBoxTopPos()).toEqual(0);
    expect(a.getHitBoxBottomPos()).toEqual(50);
  });

  // Center: genuine overlap on both axes
  test.for([
    generateCollidableObjects(25, 0, 50, 50),
    generateCollidableObjects(25, 25, 50, 50),
    generateCollidableObjects(0, 25, 50, 50),
    generateCollidableObjects(0, 0, 50, 50),
    generateCollidableObjects(0, -25, 50, 50),
    generateCollidableObjects(-25, -25, 50, 50),
    generateCollidableObjects(-25, 0, 50, 50),
  ])('b at ($x, $y) is colliding', (b) => {
    expect(a.isColliding(b)).toBe(true);
    expect(a.isHorizontalIntersecting(b)).toBe(true);
    expect(a.isVerticalIntersecting(b)).toBe(true);
    expect(a.isLeftSide(b)).toBe(false);
    expect(a.isRightSide(b)).toBe(false);
    expect(a.isAbove(b)).toBe(false);
    expect(a.isBelow(b)).toBe(false);
  });

  // Right edge: touching on x, overlapping on y
  test.for([
    generateCollidableObjects(50, -25, 50, 50),
    generateCollidableObjects(50, 0, 50, 50),
    generateCollidableObjects(50, 25, 50, 50),
  ])('b at ($x, $y) is not colliding', (b) => {
    expect(a.isColliding(b)).toBe(false);
    expect(a.isHorizontalIntersecting(b)).toBe(false);
    expect(a.isVerticalIntersecting(b)).toBe(true);
    expect(a.isLeftSide(b)).toBe(true);
    expect(a.isRightSide(b)).toBe(false);
    expect(a.isAbove(b)).toBe(false);
    expect(a.isBelow(b)).toBe(false);
  });

  // Bottom-right corner: touching at a single point
  test.for([generateCollidableObjects(50, 50, 50, 50)])(
    'b at ($x, $y) is not colliding',
    (b) => {
      expect(a.isColliding(b)).toBe(false);
      expect(a.isHorizontalIntersecting(b)).toBe(false);
      expect(a.isVerticalIntersecting(b)).toBe(false);
      expect(a.isLeftSide(b)).toBe(true);
      expect(a.isRightSide(b)).toBe(false);
      expect(a.isAbove(b)).toBe(true);
      expect(a.isBelow(b)).toBe(false);
    }
  );

  // Bottom edge: touching on y, overlapping on x
  test.for([
    generateCollidableObjects(25, 50, 50, 50),
    generateCollidableObjects(0, 50, 50, 50),
    generateCollidableObjects(-25, 50, 50, 50),
  ])('b at ($x, $y) is not colliding', (b) => {
    expect(a.isColliding(b)).toBe(false);
    expect(a.isHorizontalIntersecting(b)).toBe(true);
    expect(a.isVerticalIntersecting(b)).toBe(false);
    expect(a.isLeftSide(b)).toBe(false);
    expect(a.isRightSide(b)).toBe(false);
    expect(a.isAbove(b)).toBe(true);
    expect(a.isBelow(b)).toBe(false);
  });

  // Bottom-left corner: touching at a single point
  test.for([generateCollidableObjects(-50, 50, 50, 50)])(
    'b at ($x, $y) is not colliding',
    (b) => {
      expect(a.isColliding(b)).toBe(false);
      expect(a.isHorizontalIntersecting(b)).toBe(false);
      expect(a.isVerticalIntersecting(b)).toBe(false);
      expect(a.isLeftSide(b)).toBe(false);
      expect(a.isRightSide(b)).toBe(true);
      expect(a.isAbove(b)).toBe(true);
      expect(a.isBelow(b)).toBe(false);
    }
  );

  // Left edge: touching on x, overlapping on y
  test.for([
    generateCollidableObjects(-50, 25, 50, 50),
    generateCollidableObjects(-50, 0, 50, 50),
    generateCollidableObjects(-50, -25, 50, 50),
  ])('b at ($x, $y) is not colliding', (b) => {
    expect(a.isColliding(b)).toBe(false);
    expect(a.isHorizontalIntersecting(b)).toBe(false);
    expect(a.isVerticalIntersecting(b)).toBe(true);
    expect(a.isLeftSide(b)).toBe(false);
    expect(a.isRightSide(b)).toBe(true);
    expect(a.isAbove(b)).toBe(false);
    expect(a.isBelow(b)).toBe(false);
  });

  // Top-left corner: touching at a single point
  test.for([generateCollidableObjects(-50, -50, 50, 50)])(
    'b at ($x, $y) is not colliding',
    (b) => {
      expect(a.isColliding(b)).toBe(false);
      expect(a.isHorizontalIntersecting(b)).toBe(false);
      expect(a.isVerticalIntersecting(b)).toBe(false);
      expect(a.isLeftSide(b)).toBe(false);
      expect(a.isRightSide(b)).toBe(true);
      expect(a.isAbove(b)).toBe(false);
      expect(a.isBelow(b)).toBe(true);
    }
  );

  // Top edge: touching on y, overlapping on x
  test.for([
    generateCollidableObjects(0, -50, 50, 50),
    generateCollidableObjects(-25, -50, 50, 50),
    generateCollidableObjects(25, -50, 50, 50),
  ])('b at ($x, $y) is not colliding', (b) => {
    expect(a.isColliding(b)).toBe(false);
    expect(a.isHorizontalIntersecting(b)).toBe(true);
    expect(a.isVerticalIntersecting(b)).toBe(false);
    expect(a.isLeftSide(b)).toBe(false);
    expect(a.isRightSide(b)).toBe(false);
    expect(a.isAbove(b)).toBe(false);
    expect(a.isBelow(b)).toBe(true);
  });

  // Top-right corner: touching at a single point
  test.for([generateCollidableObjects(50, -50, 50, 50)])(
    'b at ($x, $y) is not colliding',
    (b) => {
      expect(a.isColliding(b)).toBe(false);
      expect(a.isHorizontalIntersecting(b)).toBe(false);
      expect(a.isVerticalIntersecting(b)).toBe(false);
      expect(a.isLeftSide(b)).toBe(true);
      expect(a.isRightSide(b)).toBe(false);
      expect(a.isAbove(b)).toBe(false);
      expect(a.isBelow(b)).toBe(true);
    }
  );
});
