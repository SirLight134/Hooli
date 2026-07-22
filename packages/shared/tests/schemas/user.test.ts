import { describe, it, expect } from 'vitest';
import { registerSchema, loginSchema, userSchema, createUserSchema } from '../../src/schemas/user.schema';
import { Role } from '../../src/types/user';

describe('registerSchema', () => {
  it('should validate a valid registration', () => {
    const result = registerSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = registerSchema.safeParse({
      name: 'John',
      email: 'not-an-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short password', () => {
    const result = registerSchema.safeParse({
      name: 'John',
      email: 'john@example.com',
      password: '12345',
    });
    expect(result.success).toBe(false);
  });

  it('should accept registration with optional role', () => {
    const result = registerSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: Role.SELLER,
    });
    expect(result.success).toBe(true);
  });
});

describe('loginSchema', () => {
  it('should validate a valid login', () => {
    const result = loginSchema.safeParse({
      email: 'john@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short password', () => {
    const result = loginSchema.safeParse({
      email: 'john@example.com',
      password: '12345',
    });
    expect(result.success).toBe(false);
  });
});

describe('userSchema', () => {
  it('should validate a valid user', () => {
    const result = userSchema.safeParse({
      email: 'john@example.com',
      password: 'password123',
      role: Role.BUYER,
      name: 'John Doe',
      phone: '01234567890',
    });
    expect(result.success).toBe(true);
  });

  it('should reject missing email', () => {
    const result = userSchema.safeParse({
      role: Role.BUYER,
      name: 'John',
      phone: '01234567890',
    });
    expect(result.success).toBe(false);
  });
});

describe('createUserSchema', () => {
  it('should validate when passwords match', () => {
    const result = createUserSchema.safeParse({
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: Role.BUYER,
      name: 'John Doe',
      phone: '01234567890',
    });
    expect(result.success).toBe(true);
  });

  it('should reject when passwords do not match', () => {
    const result = createUserSchema.safeParse({
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'different',
      role: Role.BUYER,
      name: 'John Doe',
      phone: '01234567890',
    });
    expect(result.success).toBe(false);
  });
});
