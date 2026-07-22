import { describe, it, expect } from 'vitest';
import { addressSchema, orderItemSchema, orderSchema, createOrderSchema } from '../../src/schemas/order.schema';
import { OrderStatus } from '../../src/types/order';

describe('addressSchema', () => {
  it('should validate a valid address', () => {
    const result = addressSchema.safeParse({
      street: '123 Main St',
      city: 'Cairo',
      country: 'Egypt',
      zipCode: '12345',
    });
    expect(result.success).toBe(true);
  });

  it('should reject short street', () => {
    const result = addressSchema.safeParse({
      street: 'AB',
      city: 'Cairo',
      country: 'Egypt',
      zipCode: '12345',
    });
    expect(result.success).toBe(false);
  });
});

describe('orderItemSchema', () => {
  it('should validate a valid order item', () => {
    const result = orderItemSchema.safeParse({
      productId: '507f1f77bcf86cd799439011',
      quantity: 2,
      price: 29.99,
    });
    expect(result.success).toBe(true);
  });
});

describe('orderSchema', () => {
  it('should validate a valid order', () => {
    const result = orderSchema.safeParse({
      buyerId: '507f1f77bcf86cd799439011',
      items: [{ productId: '507f1f77bcf86cd799439011', quantity: 1, price: 29.99 }],
      total: 29.99,
      status: OrderStatus.PENDING,
      stripeSessionId: 'cs_test_123',
      shippingAddress: {
        street: '123 Main St',
        city: 'Cairo',
        country: 'Egypt',
        zipCode: '12345',
      },
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid order status', () => {
    const result = orderSchema.safeParse({
      buyerId: '507f1f77bcf86cd799439011',
      items: [{ productId: '507f1f77bcf86cd799439011', quantity: 1, price: 29.99 }],
      total: 29.99,
      status: 'INVALID_STATUS',
      stripeSessionId: 'cs_test_123',
      shippingAddress: {
        street: '123 Main St',
        city: 'Cairo',
        country: 'Egypt',
        zipCode: '12345',
      },
    });
    expect(result.success).toBe(false);
  });
});

describe('createOrderSchema', () => {
  it('should validate order input without buyerId/status/stripeSessionId', () => {
    const result = createOrderSchema.safeParse({
      items: [{ productId: '507f1f77bcf86cd799439011', quantity: 1, price: 29.99 }],
      total: 29.99,
      shippingAddress: {
        street: '123 Main St',
        city: 'Cairo',
        country: 'Egypt',
        zipCode: '12345',
      },
    });
    expect(result.success).toBe(true);
  });
});
