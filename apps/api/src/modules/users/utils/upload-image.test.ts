import { describe, expect, it, vi, beforeEach } from 'vitest';
import { uploadImageToCloudinary } from './upload-image.js';
import { cloudinary } from '../../../config/cloudinary.js';

vi.mock('../../../config/cloudinary.js', () => {
  return {
    cloudinary: {
      uploader: {
        upload_stream: vi.fn(),
      },
    },
  };
});

describe('Upload Image Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully upload an image to Cloudinary', async () => {
    const mockResult = { secure_url: 'https://cloudinary.com/avatar.jpg' };
    const mockUploadStream = {
      on: vi.fn().mockReturnThis(),
      end: vi.fn(() => {
        const callback = vi.mocked(cloudinary.uploader.upload_stream).mock
          .calls[0][1];
        if (callback) {
          callback(undefined, mockResult as any);
        }
      }),
    };

    vi.mocked(cloudinary.uploader.upload_stream).mockReturnValue(
      mockUploadStream as any
    );

    const buffer = Buffer.from('test-image-data');
    const result = await uploadImageToCloudinary(buffer);

    expect(cloudinary.uploader.upload_stream).toHaveBeenCalled();
    expect(mockUploadStream.end).toHaveBeenCalledWith(buffer);
    expect(result).toEqual(mockResult);
  });

  it('should reject with error if Cloudinary upload fails', async () => {
    const mockError = new Error('Upload failed');
    const mockUploadStream = {
      on: vi.fn().mockReturnThis(),
      end: vi.fn(() => {
        const callback = vi.mocked(cloudinary.uploader.upload_stream).mock
          .calls[0][1];
        if (callback) {
          callback(mockError, undefined);
        }
      }),
    };

    vi.mocked(cloudinary.uploader.upload_stream).mockReturnValue(
      mockUploadStream as any
    );

    const buffer = Buffer.from('test-image-data');
    await expect(uploadImageToCloudinary(buffer)).rejects.toThrow(
      'Upload failed'
    );
  });

  it('should reject with custom error if Cloudinary upload returns falsy error and result', async () => {
    const mockUploadStream = {
      on: vi.fn().mockReturnThis(),
      end: vi.fn(() => {
        const callback = vi.mocked(cloudinary.uploader.upload_stream).mock
          .calls[0][1];
        if (callback) {
          callback(undefined, undefined);
        }
      }),
    };

    vi.mocked(cloudinary.uploader.upload_stream).mockReturnValue(
      mockUploadStream as any
    );

    const buffer = Buffer.from('test-image-data');
    await expect(uploadImageToCloudinary(buffer)).rejects.toThrow(
      'Cloudinary upload failed'
    );
  });

  it('should reject with error if upload stream emits error event', async () => {
    const mockError = new Error('Stream error');
    let errorCallback: ((err: Error) => void) | undefined;

    const mockUploadStream = {
      on: vi.fn((event, cb) => {
        if (event === 'error') {
          errorCallback = cb as (err: Error) => void;
        }
        return mockUploadStream;
      }),
      end: vi.fn(() => {
        if (errorCallback) {
          errorCallback(mockError);
        }
      }),
    };

    vi.mocked(cloudinary.uploader.upload_stream).mockReturnValue(
      mockUploadStream as any
    );

    const buffer = Buffer.from('test-image-data');
    await expect(uploadImageToCloudinary(buffer)).rejects.toThrow(
      'Stream error'
    );
  });
});
