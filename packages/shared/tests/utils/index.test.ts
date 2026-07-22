import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate, formOrderId } from '../../src/utils/format';
import {
  calculateCartTotal,
  calculateOrderTotal,
  roundMoney,
  isValidObjectId,
  createslug,
  getPaginationParams,
} from '../../src/utils/helpers';

describe('formatPrice', () => {
  it('should format price with default currency (EGP)', () => {
    const result = formatPrice(29.99);
    expect(result).toContain('29.99');
  });

  it('should format price with specified currency', () => {
    const result = formatPrice(29.99, 'USD');
    expect(result).toContain('29.99');
  });

  it('should format zero', () => {
    const result = formatPrice(0);
    expect(result).toContain('0');
  });
});

describe('formatDate', () => {
  it('should format a date', () => {
    const date = new Date('2024-01-15');
    const result = formatDate(date);
    expect(result).toContain('January');
    expect(result).toContain('15');
    expect(result).toContain('2024');
  });
});

describe('formOrderId', () => {
  it('should format an order ID with ORD- prefix', () => {
    const result = formOrderId('abc123def456');
    expect(result).toBe('ORD-ABC123DEF4');
  });

  it('should handle short IDs', () => {
    const result = formOrderId('abc');
    expect(result).toBe('ORD-ABC');
  });
});

describe('calculateCartTotal', () => {
  it('should calculate total items and price', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    const result = calculateCartTotal(items);
    expect(result).toEqual({ totalItems: 5, totalPrice: 35 });
  });

  it('should handle empty cart', () => {
    const result = calculateCartTotal([]);
    expect(result).toEqual({ totalItems: 0, totalPrice: 0 });
  });
});

describe('calculateOrderTotal', () => {
  it('should calculate total price', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    const result = calculateOrderTotal(items);
    expect(result).toBe(35);
  });

  it('should handle empty items', () => {
    const result = calculateOrderTotal([]);
    expect(result).toBe(0);
  });
});

describe('roundMoney', () => {
  it('should round to two decimal places', () => {
    expect(roundMoney(10.456)).toBe(10.46);
    expect(roundMoney(10.454)).toBe(10.45);
  });

  it('should handle whole numbers', () => {
    expect(roundMoney(10)).toBe(10);
  });
});

describe('isValidObjectId', () => {
  it('should validate a correct 24-char hex string', () => {
    expect(isValidObjectId('507f1f77bcf86cd799439011')).toBe(true);
  });

  it('should reject short strings', () => {
    expect(isValidObjectId('short')).toBe(false);
  });

  it('should reject non-hex characters', () => {
    expect(isValidObjectId('zzzzzzzzzzzzzzzzzzzzzzzz')).toBe(false);
  });
});

describe('createslug', () => {
  it('should create a slug from text', () => {
    expect(createslug('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(createslug('Hello World! @Test')).toBe('hello-world-test');
  });

  it('should handle multiple spaces', () => {
    expect(createslug('Hello   World')).toBe('hello-world');
  });
});

describe('getPaginationParams', () => {
  it('should return default pagination params', () => {
    const result = getPaginationParams();
    expect(result).toEqual({ page: 1, limit: 10 });
  });

  it('should return custom pagination params', () => {
    const result = getPaginationParams(2, 20);
    expect(result).toEqual({ page: 2, limit: 20 });
  });
});
