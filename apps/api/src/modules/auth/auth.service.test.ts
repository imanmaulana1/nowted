import { describe, expect, it, vi } from 'vitest';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '../../shared/errors/index.js';
import * as authRepository from './auth.repository.js';
import * as authService from './auth.service.js';
import { hashPassword, verifyPassword } from './utils/password.helper.js';
import {
  generateRefreshToken,
  hashRefreshToken,
  signAccessToken,
} from './utils/token.helper.js';

vi.mock('./auth.repository.js', () => ({
  existsByEmail: vi.fn(),
  createUser: vi.fn(),
  findAuthUserByEmail: vi.fn(),
  createSession: vi.fn(),
  deleteSessionByTokenHash: vi.fn(),
  findSessionByTokenHash: vi.fn(),
  updateSessionByTokenHash: vi.fn(),
  findAuthUserById: vi.fn(),
  findUserPasswordById: vi.fn(),
  updateUserPassword: vi.fn(),
  deleteSessionByUserId: vi.fn(),
}));

vi.mock('./utils/password.helper.js', () => ({
  hashPassword: vi.fn(),
  verifyPassword: vi.fn(),
}));

vi.mock('./utils/token.helper.js', () => ({
  generateRefreshToken: vi.fn(),
  hashRefreshToken: vi.fn(),
  signAccessToken: vi.fn(),
}));

describe('Auth Service', () => {
  describe('register', () => {
    it('should successfully register a new user when email does not exist', async () => {
      const registerPayload = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const mockCreatedUser = {
        id: 'mock-user-uuid',
        fullName: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(authRepository.existsByEmail).mockResolvedValue(false);
      vi.mocked(hashPassword).mockResolvedValue('mock-hashed-password');
      vi.mocked(authRepository.createUser).mockResolvedValue(mockCreatedUser);

      const result = await authService.register(registerPayload);

      expect(authRepository.existsByEmail).toHaveBeenCalledWith(
        'john@example.com'
      );
      expect(hashPassword).toHaveBeenCalledWith('password123');
      expect(authRepository.createUser).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'mock-hashed-password',
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it('should throw ConflictError when email already exists', async () => {
      const registerPayload = {
        fullName: 'John Doe',
        email: 'existing@example.com',
        password: 'password123',
      };

      vi.mocked(authRepository.existsByEmail).mockResolvedValue(true);

      await expect(authService.register(registerPayload)).rejects.toThrow(
        ConflictError
      );
      expect(authRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedError when user is not found by email', async () => {
      const loginPayload = {
        email: 'notfound@example.com',
        password: 'password123',
      };
      vi.mocked(authRepository.findAuthUserByEmail).mockResolvedValue(null);

      await expect(
        authService.login(loginPayload, 'user-agent', '127.0.0.1')
      ).rejects.toThrow(UnauthorizedError);
    });

    it('should throw UnauthorizedError when password is invalid', async () => {
      const loginPayload = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };
      const mockUser = {
        id: 'mock-id',
        fullName: 'John',
        email: 'john@example.com',
        password: 'hashed-password',
        avatarUrl: null,
      };

      vi.mocked(authRepository.findAuthUserByEmail).mockResolvedValue(mockUser);
      vi.mocked(verifyPassword).mockResolvedValue(false);

      await expect(
        authService.login(loginPayload, 'user-agent', '127.0.0.1')
      ).rejects.toThrow(UnauthorizedError);
      expect(verifyPassword).toHaveBeenCalledWith(
        'wrongpassword',
        'hashed-password'
      );
    });

    it('should successfully log in, create a session, and return tokens', async () => {
      const loginPayload = {
        email: 'john@example.com',
        password: 'correctpassword',
      };
      const mockUser = {
        id: 'mock-id',
        fullName: 'John',
        email: 'john@example.com',
        password: 'hashed-password',
        avatarUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: { folders: 2, notes: 5 },
      };

      const mockRefreshToken = {
        plain: 'plain-refresh-token',
        hash: 'hashed-refresh-token',
      };

      vi.mocked(authRepository.findAuthUserByEmail).mockResolvedValue(mockUser);
      vi.mocked(verifyPassword).mockResolvedValue(true);
      vi.mocked(signAccessToken).mockResolvedValue('mock-access-token');
      vi.mocked(generateRefreshToken).mockReturnValue(mockRefreshToken);
      vi.mocked(authRepository.createSession).mockResolvedValue({} as any);

      const result = await authService.login(
        loginPayload,
        'user-agent',
        '127.0.0.1'
      );

      expect(signAccessToken).toHaveBeenCalledWith({ sub: 'mock-id' });
      expect(generateRefreshToken).toHaveBeenCalled();
      expect(authRepository.createSession).toHaveBeenCalledWith({
        userId: 'mock-id',
        tokenHash: 'hashed-refresh-token',
        userAgent: 'user-agent',
        ipAddress: '127.0.0.1',
        expiresAt: expect.any(Date),
      });
      expect(result).toEqual({
        user: {
          id: 'mock-id',
          fullName: 'John',
          email: 'john@example.com',
          avatarUrl: null,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
          totalNotes: 5,
          totalFolders: 2,
        },
        accessToken: 'mock-access-token',
        refreshToken: 'plain-refresh-token',
      });
    });
  });

  describe('logout', () => {
    it('should return early without doing anything if refresh token is empty', async () => {
      await authService.logout('');

      expect(hashRefreshToken).not.toHaveBeenCalled();
      expect(authRepository.deleteSessionByTokenHash).not.toHaveBeenCalled();
    });

    it('should hash the refresh token and delete the corresponding session', async () => {
      vi.mocked(hashRefreshToken).mockReturnValue('hashed-token');

      await authService.logout('plain-token');

      expect(hashRefreshToken).toHaveBeenCalledWith('plain-token');
      expect(authRepository.deleteSessionByTokenHash).toHaveBeenCalledWith(
        'hashed-token'
      );
    });
  });

  describe('refresh', () => {
    it('should throw UnauthorizedError if token is undefined', async () => {
      await expect(
        authService.refresh(undefined, 'user-agent', '127.0.0.1')
      ).rejects.toThrow(UnauthorizedError);
    });

    it('should throw UnauthorizedError if session is not found in database', async () => {
      vi.mocked(hashRefreshToken).mockReturnValue('hashed-token');
      vi.mocked(authRepository.findSessionByTokenHash).mockResolvedValue(null);

      await expect(
        authService.refresh('plain-token', 'user-agent', '127.0.0.1')
      ).rejects.toThrow(UnauthorizedError);
    });

    it('should throw UnauthorizedError if session has expired', async () => {
      const expiredSession = {
        id: 'session-id',
        tokenHash: 'hashed-token',
        userId: 'user-id',
        userAgent: null,
        ipAddress: null,
        expiresAt: new Date(Date.now() - 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.mocked(hashRefreshToken).mockReturnValue('hashed-token');
      vi.mocked(authRepository.findSessionByTokenHash).mockResolvedValue(
        expiredSession
      );

      await expect(
        authService.refresh('plain-token', 'user-agent', '127.0.0.1')
      ).rejects.toThrow(UnauthorizedError);
    });

    it('should successfully refresh session and return new access and refresh tokens', async () => {
      const validSession = {
        id: 'session-id',
        tokenHash: 'old-hashed-token',
        userId: 'user-id',
        userAgent: null,
        ipAddress: null,
        expiresAt: new Date(Date.now() + 1000 * 60),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockNewRefreshToken = {
        plain: 'new-plain-token',
        hash: 'new-hashed-token',
      };

      vi.mocked(hashRefreshToken).mockReturnValue('old-hashed-token');
      vi.mocked(authRepository.findSessionByTokenHash).mockResolvedValue(
        validSession
      );
      vi.mocked(signAccessToken).mockResolvedValue('new-access-token');
      vi.mocked(generateRefreshToken).mockReturnValue(mockNewRefreshToken);

      const result = await authService.refresh(
        'old-plain-token',
        'user-agent',
        '127.0.0.1'
      );

      expect(signAccessToken).toHaveBeenCalledWith({ sub: 'user-id' });
      expect(generateRefreshToken).toHaveBeenCalled();
      expect(authRepository.updateSessionByTokenHash).toHaveBeenCalledWith(
        'old-hashed-token',
        {
          tokenHash: 'new-hashed-token',
          userAgent: 'user-agent',
          ipAddress: '127.0.0.1',
          expiresAt: expect.any(Date),
        }
      );
      expect(result).toEqual({
        newAccessToken: 'new-access-token',
        newRefreshToken: 'new-plain-token',
      });
    });
  });

  describe('getCurrentUser', () => {
    it('should throw UnauthorizedError when user is not found by ID', async () => {
      vi.mocked(authRepository.findAuthUserById).mockResolvedValue(null);

      await expect(
        authService.getCurrentUser('non-existent-id')
      ).rejects.toThrow(UnauthorizedError);
    });

    it('should successfully return the current user details with folder and note counts', async () => {
      const mockUser = {
        id: 'user-id',
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        avatarUrl: 'https://avatar.com/jane',
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: { folders: 3, notes: 12 },
      };
      vi.mocked(authRepository.findAuthUserById).mockResolvedValue(mockUser);

      const result = await authService.getCurrentUser('user-id');

      expect(authRepository.findAuthUserById).toHaveBeenCalledWith('user-id');
      expect(result).toEqual({
        id: 'user-id',
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        avatarUrl: 'https://avatar.com/jane',
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
        totalFolders: 3,
        totalNotes: 12,
      });
    });
  });

  describe('changePassword', () => {
    it('should throw UnauthorizedError when user is not found in database', async () => {
      const changePasswordPayload = {
        currentPassword: 'password123',
        newPassword: 'newpassword123',
      };
      vi.mocked(authRepository.findUserPasswordById).mockResolvedValue(null);

      await expect(
        authService.changePassword('non-existent-id', changePasswordPayload)
      ).rejects.toThrow(UnauthorizedError);
    });

    it('should throw BadRequestError when the current password is incorrect', async () => {
      const changePasswordPayload = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123',
      };
      const mockUser = { id: 'user-id', password: 'hashed-current-password' };

      vi.mocked(authRepository.findUserPasswordById).mockResolvedValue(
        mockUser
      );
      vi.mocked(verifyPassword).mockResolvedValue(false);

      await expect(
        authService.changePassword('user-id', changePasswordPayload)
      ).rejects.toThrow(BadRequestError);
      expect(verifyPassword).toHaveBeenCalledWith(
        'wrongpassword',
        'hashed-current-password'
      );
    });

    it('should successfully update the password and delete all active sessions of the user', async () => {
      const changePasswordPayload = {
        currentPassword: 'correctpassword',
        newPassword: 'newpassword123',
      };
      const mockUser = { id: 'user-id', password: 'hashed-current-password' };

      vi.mocked(authRepository.findUserPasswordById).mockResolvedValue(
        mockUser
      );
      vi.mocked(verifyPassword).mockResolvedValue(true);
      vi.mocked(hashPassword).mockResolvedValue('new-hashed-password');

      await authService.changePassword('user-id', changePasswordPayload);

      expect(verifyPassword).toHaveBeenCalledWith(
        'correctpassword',
        'hashed-current-password'
      );
      expect(hashPassword).toHaveBeenCalledWith('newpassword123');
      expect(authRepository.updateUserPassword).toHaveBeenCalledWith(
        'user-id',
        'new-hashed-password'
      );
      expect(authRepository.deleteSessionByUserId).toHaveBeenCalledWith(
        'user-id'
      );
    });
  });
});
