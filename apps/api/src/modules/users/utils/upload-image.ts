import { cloudinary } from '#/config/cloudinary.js';
import type { UploadApiResponse } from 'cloudinary';

export const uploadImageToCloudinary = async (
  fileBuffer: Buffer
): Promise<UploadApiResponse> => {
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(
        new Error(
          'Cloudinary upload timeout (15s exceeded). Check your internet connection.'
        )
      );
    }, 15000);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'nowted-app',
        transformation: [
          { width: 256, height: 256, crop: 'fill', gravity: 'auto' },
          { fetch_format: 'auto', quality: 'auto' },
        ],
      },
      (error, result) => {
        clearTimeout(timeout);
        if (error || !result) {
          const rejectReason =
            error instanceof Error
              ? error
              : new Error(error?.message || 'Cloudinary upload failed');
          reject(rejectReason);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    uploadStream.end(fileBuffer);
  });

  return result;
};
