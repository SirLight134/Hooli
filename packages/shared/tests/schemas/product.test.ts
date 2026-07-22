import { describe, it, expect } from 'vitest';
import { createProductSchema, productSchema, updateProductSchema } from '../../src/schemas/product.schema';

describe('productSchema', () => {
  it('should validate a valid product', () => {
    const result = productSchema.safeParse({
      name: 'Test Product',
      description: 'A test product description',
      price: 29.99,
      stock: 10,
      seller: '507f1f77bcf86cd799439011',
      images: ['https://example.com/img.jpg'],
      category: 'Electronics',
      slug: 'test-product',
    });
    expect(result.success).toBe(true);
  });

  it('should reject when name is too short', () => {
    const result = productSchema.safeParse({
      name: 'AB',
      description: 'Test description',
      price: 10,
      stock: 5,
      seller: '507f1f77bcf86cd799439011',
    });
    expect(result.success).toBe(false);
  });
});

describe('createProductSchema', () => {
  it('should validate a valid product input (without seller/slug)', () => {
    const result = createProductSchema.safeParse({
      name: 'Test Product',
      description: 'A test product',
      price: 29.99,
      stock: 10,
      images: ['https://example.com/img.jpg'],
      category: 'Electronics',
    });
    expect(result.success).toBe(true);
  });

  it('should reject when name is too short', () => {
    const result = createProductSchema.safeParse({
      name: 'AB',
      description: 'Test',
      price: 10,
      stock: 5,
    });
    expect(result.success).toBe(false);
  });

  it('should reject when description is too short', () => {
    const result = createProductSchema.safeParse({
      name: 'Valid Name',
      description: 'AB',
      price: 10,
      stock: 5,
    });
    expect(result.success).toBe(false);
  });

  it('should accept optional fields (images, category, brand, tags)', () => {
    const result = createProductSchema.safeParse({
      name: 'Test Product',
      description: 'A test product',
      price: 29.99,
      stock: 10,
    });
    expect(result.success).toBe(true);
  });
});

describe('updateProductSchema', () => {
  it('should accept partial product data', () => {
    const result = updateProductSchema.safeParse({ name: 'Updated Name' });
    expect(result.success).toBe(true);
  });

  it('should accept empty object', () => {
    const result = updateProductSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});
