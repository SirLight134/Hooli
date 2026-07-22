import { describe, it, expect } from 'vitest';
import { AppError, validationError, notFoundError, unauthorizedError } from '../utils/errors';

describe('AppError', () => {
  it('should create an error with the correct status code', () => {
    const error = new AppError('Test error', 400);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.status).toBe('fail');
    expect(error.isOperational).toBe(true);
  });

  it('should set status to "error" for 500+ codes', () => {
    const error = new AppError('Server error', 500);
    expect(error.status).toBe('error');
  });
});

describe('validationError', () => {
  it('should create an AppError with status 400', () => {
    const error = validationError('Invalid input');
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Invalid input');
  });
});

describe('notFoundError', () => {
  it('should create an AppError with status 404', () => {
    const error = notFoundError('Not found');
    expect(error.statusCode).toBe(404);
  });
});

describe('unauthorizedError', () => {
  it('should create an AppError with status 401', () => {
    const error = unauthorizedError('Unauthorized');
    expect(error.statusCode).toBe(401);
  });
});
