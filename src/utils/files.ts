import { IllegalMimeType } from '@/utils/errors';

export const validateMimeType = (allowedMimeTypes: string[], mimeType: string): void => {
  const isValidMimeType = allowedMimeTypes.includes(mimeType);
  if (!isValidMimeType) throw new IllegalMimeType(mimeType);
};
