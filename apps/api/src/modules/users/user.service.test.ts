import { describe, expect, it, vi } from 'vitest';
import * as userService from './user.service.js';
import * as userRepository from './user.repository.js';
import { uploadImageToCloudinary } from './utils/upload-image.js';

vi.mock('./user.repository.js', () => ({
  updateUserProfile: vi.fn(),
}));

vi.mock('./utils/upload-image.js', () => ({
  uploadImageToCloudinary: vi.fn(),
}));

describe('User Service - updateProfile', () => {
  it('should update fullName only if no file buffer is supplied', async () => {
    const payload = { fullName: 'Updated Name' };
    const mockUpdatedUser = {
      id: 'user-id',
      fullName: 'Updated Name',
      avatarUrl: 'old-url',
    };

    vi.mocked(userRepository.updateUserProfile).mockResolvedValue(
      mockUpdatedUser as any
    );

    const result = await userService.updateProfile('user-id', payload);

    expect(uploadImageToCloudinary).not.toHaveBeenCalled();
    expect(userRepository.updateUserProfile).toHaveBeenCalledWith('user-id', {
      fullName: 'Updated Name',
    });
    expect(result).toEqual(mockUpdatedUser);
  });

  it('should upload avatar image to Cloudinary and update avatarUrl when file buffer is supplied', async () => {
    const payload = { fullName: 'Jane Doe' };
    const fileBuffer = Buffer.from('mock-image-data');
    const mockUploadResult = {
      secure_url: 'https://cloudinary.com/new-avatar.jpg',
    };
    const mockUpdatedUser = {
      id: 'user-id',
      fullName: 'Jane Doe',
      avatarUrl: 'https://cloudinary.com/new-avatar.jpg',
    };

    vi.mocked(uploadImageToCloudinary).mockResolvedValue(
      mockUploadResult as any
    );
    vi.mocked(userRepository.updateUserProfile).mockResolvedValue(
      mockUpdatedUser as any
    );

    const result = await userService.updateProfile(
      'user-id',
      payload,
      fileBuffer
    );

    expect(uploadImageToCloudinary).toHaveBeenCalledWith(fileBuffer);
    expect(userRepository.updateUserProfile).toHaveBeenCalledWith('user-id', {
      fullName: 'Jane Doe',
      avatarUrl: 'https://cloudinary.com/new-avatar.jpg',
    });
    expect(result).toEqual(mockUpdatedUser);
  });

  it('should remove avatar url when removeAvatar is true and no file buffer is supplied', async () => {
    const payload = { fullName: 'Jane Doe', removeAvatar: true };
    const mockUpdatedUser = {
      id: 'user-id',
      fullName: 'Jane Doe',
      avatarUrl: null,
    };

    vi.mocked(userRepository.updateUserProfile).mockResolvedValue(
      mockUpdatedUser as any
    );

    const result = await userService.updateProfile('user-id', payload);

    expect(uploadImageToCloudinary).not.toHaveBeenCalled();
    expect(userRepository.updateUserProfile).toHaveBeenCalledWith('user-id', {
      fullName: 'Jane Doe',
      avatarUrl: null,
    });
    expect(result).toEqual(mockUpdatedUser);
  });

  it('should update removeAvatar only when fullName is not supplied', async () => {
    const payload = { removeAvatar: true };
    const mockUpdatedUser = {
      id: 'user-id',
      fullName: 'Jane Doe',
      avatarUrl: null,
    };

    vi.mocked(userRepository.updateUserProfile).mockResolvedValue(
      mockUpdatedUser as any
    );

    const result = await userService.updateProfile('user-id', payload);

    expect(uploadImageToCloudinary).not.toHaveBeenCalled();
    expect(userRepository.updateUserProfile).toHaveBeenCalledWith('user-id', {
      avatarUrl: null,
    });
    expect(result).toEqual(mockUpdatedUser);
  });
});
