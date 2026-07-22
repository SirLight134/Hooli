import { describe, it, expect } from 'vitest';
import { cartItemSchema, cartSchema, addToCartSchema, updateCartItemSchema } from '../../src/schemas/cart.schema';

describe('cartItemSchema', () => {
  it('should validate a valid cart item', () => {
    const result = cartItemSchema.safeParse({
      productId: '507f1f77bcf86cd799439011',
      quantity: 2,
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid productId length', () => {
    const result = cartItemSchema.safeParse({
      productId: 'short',
      quantity: 1,
    });
    expect(result.success).toBe(false);
  });

  it('should reject zero quantity', () => {
    const result = cartItemSchema.safeParse({
      productId: '507f1f77bcf86cd799439011',
      quantity: 0,
    });
    expect(result.success).toBe(false);
  });

  it('should reject negative quantity', () => {
    const result = cartItemSchema.safeParse({
      productId: '507f1f77bcf86cd799439011',
      quantity: -1,
    });
    expect(result.success).toBe(false);
  });

  it('should reject quantity above max', () => {
    const result = cartItemSchema.safeParse({
      productId: '507f1f77bcf86cd799439011',
      quantity: 101,
    });
    expect(result.success).toBe(false);
  });
});

describe('cartSchema', () => {
  it('should validate a valid cart', () => {
    const result = cartSchema.safeParse({
      userId: '507f1f77bcf86cd799439011',
      items: [{ productId: '507f1f77bcf86cd799439011', quantity: 1 }],
    });
    expect(result.success).toBe(true);
  });

  it('should reject empty items array', () => {
    const result = cartSchema.safeParse({
      userId: '507f1f77bcf86cd799439011',
      items: [],
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid userId', () => {
    const result = cartSchema.safeParse({
      userId: 'bad-id',
      items: [{ productId: '507f1f77bcf86cd799439011', quantity: 1 }],
    });
    expect(result.success).toBe(false);
  });
});

describe('addToCartSchema', () => {
  it('should be equivalent to cartItemSchema', () => {
    const result = addToCartSchema.safeParse({
      productId: '507f1f77bcf86cd799439011',
      quantity: 3,
    });
    expect(result.success).toBe(true);
  });
});

describe('updateCartItemSchema', () => {
  it('should be equivalent to cartItemSchema', () => {
    const result = updateCartItemSchema.safeParse({
      productId: '507f1f77bcf86cd799439011',
      quantity: 5,
    });
    expect(result.success).toBe(true);
  });
});
