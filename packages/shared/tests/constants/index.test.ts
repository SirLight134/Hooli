import { describe, it, expect } from 'vitest';
import { CartLimits, OrderLimits } from '../../src/constants/limits';
import { OrderStatus, OrderStatusValues } from '../../src/constants/order-status';
import { Pagination, PaginationLimits } from '../../src/constants/pagination';

describe('CartLimits', () => {
  it('should have MAX_ITEMS_PER_CART set to 100', () => {
    expect(CartLimits.MAX_ITEMS_PER_CART).toBe(100);
  });

  it('should have MAX_QUANTITY_PER_ITEM set to 100', () => {
    expect(CartLimits.MAX_QUANTITY_PER_ITEM).toBe(100);
  });
});

describe('OrderLimits', () => {
  it('should have MAX_ITEMS_PER_ORDER set to 100', () => {
    expect(OrderLimits.MAX_ITEMS_PER_ORDER).toBe(100);
  });
});

describe('OrderStatus', () => {
  it('should have expected status values', () => {
    expect(OrderStatus.PENDING).toBe('PENDING');
    expect(OrderStatus.PAID).toBe('PAID');
    expect(OrderStatus.SHIPPED).toBe('SHIPPED');
    expect(OrderStatus.DELIVERED).toBe('DELIVERED');
    expect(OrderStatus.CANCELLED).toBe('CANCELLED');
    expect(OrderStatus.PROCESSING).toBe('PROCESSING');
  });
});

describe('OrderStatusValues', () => {
  it('should contain all order statuses', () => {
    expect(OrderStatusValues).toContain('PENDING');
    expect(OrderStatusValues).toContain('PAID');
    expect(OrderStatusValues).toContain('SHIPPED');
    expect(OrderStatusValues).toContain('DELIVERED');
    expect(OrderStatusValues).toContain('CANCELLED');
    expect(OrderStatusValues).toContain('PROCESSING');
  });
});

describe('Pagination', () => {
  it('should have DEFAULT_PAGE set to 1', () => {
    expect(Pagination.DEFAULT_PAGE).toBe(1);
  });

  it('should have DEFAULT_LIMIT set to 10', () => {
    expect(Pagination.DEFAULT_LIMIT).toBe(10);
  });

  it('should have MAX_LIMIT set to 100', () => {
    expect(Pagination.MAX_LIMIT).toBe(100);
  });
});

describe('PaginationLimits', () => {
  it('should contain all pagination values', () => {
    expect(PaginationLimits).toContain(1);
    expect(PaginationLimits).toContain(10);
    expect(PaginationLimits).toContain(100);
  });
});
