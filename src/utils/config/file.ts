export const AWS_REGION = process.env.AWS_REGION ?? 'us-east-1';

/**
 * The following configuration specifies the bucket that's
 * used for file upload.
 * [urlExpirationTime] specifies the time (in seconds) that a signed url
 * stays valid. (See https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html)
 * TL;DR: max length 1 week (604800 seconds)
 */
export const S3_CONFIG = {
  // in seconds
  urlExpirationTime: process.env.S3_URL_LIFETIME
    ? parseInt(process.env.S3_URL_LIFETIME, 10)
    : 604800,
  region: AWS_REGION,
  // default to aws credentials for offline tests
  signatureAccessKeyId: process.env.AWS_ACCESS_KEY_ID_FOR_S3 ?? process.env.AWS_ACCESS_KEY_ID!,
  signatureSecretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY_FOR_S3 ?? process.env.SECRET_ACCESS_KEY!,
  bucket: 'kop-state12b45bc', // Fix Later
};
