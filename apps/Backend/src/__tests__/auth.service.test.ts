import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validationError, notFoundError, unauthorizedError } from '../utils/errors';

// Mock User model
vi.mock('../models/User.model.js', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
  },
}));

import User from '../models/User.model.js';
import { registerService, loginService, refreshService, logoutService } from '../services/auth.service.js';

describe('registerService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw validationError when name is missing', async () => {
    await expect(registerService({ email: 'test@test.com', password: 'pass123' }))
      .rejects.toThrow('All fields are required');
  });

  it('should throw validationError when email already exists', async () => {
    (User.findOne as any).mockResolvedValue({ email: 'test@test.com' });
    await expect(registerService({ name: 'Test', email: 'test@test.com', password: 'pass123' }))
      .rejects.toThrow('User already exists');
  });

  it('should register a user successfully', async () => {
    (User.findOne as any).mockResolvedValue(null);
    const mockUser = {
      _id: 'user1',
      name: 'Test',
      email: 'test@test.com',
      generateToken: vi.fn().mockResolvedValue('token123'),
    };
    (User.create as any).mockResolvedValue(mockUser);

    const result = await registerService({ name: 'Test', email: 'test@test.com', password: 'pass123' });
    expect(result.token).toBe('token123');
    expect(result.user).toBe(mockUser);
  });
});

describe('loginService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw validationError when email is missing', async () => {
    await expect(loginService('', 'pass')).rejects.toThrow('All fields are required');
  });

  it('should throw notFoundError when user does not exist', async () => {
    (User.findOne as any).mockReturnValue({ select: vi.fn().mockResolvedValue(null) });
    await expect(loginService('test@test.com', 'pass')).rejects.toThrow('User not found');
  });

  it('should throw unauthorizedError when password is wrong', async () => {
    const mockUser = {
      comparePassword: vi.fn().mockResolvedValue(false),
    };
    (User.findOne as any).mockReturnValue({ select: vi.fn().mockResolvedValue(mockUser) });
    await expect(loginService('test@test.com', 'wrongpass')).rejects.toThrow('Invalid password');
  });

  it('should login successfully with correct credentials', async () => {
    const mockUser = {
      _id: 'user1',
      name: 'Test',
      email: 'test@test.com',
      comparePassword: vi.fn().mockResolvedValue(true),
      generateToken: vi.fn().mockResolvedValue('token123'),
    };
    (User.findOne as any).mockReturnValue({ select: vi.fn().mockResolvedValue(mockUser) });

    const result = await loginService('test@test.com', 'correctpass');
    expect(result.token).toBe('token123');
    expect(result.message).toBe('User logged in successfully');
  });
});

describe('refreshService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw notFoundError when user does not exist', async () => {
    (User.findById as any).mockResolvedValue(null);
    await expect(refreshService('invalid-id')).rejects.toThrow('User not found');
  });

  it('should refresh token successfully', async () => {
    const mockUser = {
      generateToken: vi.fn().mockResolvedValue('new-token'),
    };
    (User.findById as any).mockResolvedValue(mockUser);
    const result = await refreshService('user1');
    expect(result.token).toBe('new-token');
  });
});

describe('logoutService', () => {
  it('should return success message', async () => {
    const result = await logoutService('user1');
    expect(result.message).toBe('User logged out successfully');
  });
});
