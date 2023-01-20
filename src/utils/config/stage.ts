// stage
export const { STAGE } = process.env;
export const IS_DEV_STAGE = STAGE === 'dev';
export const IS_STAGING_STAGE = STAGE === 'staging';
export const IS_PRODUCTION_STAGE = STAGE === 'prod';

export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PRODUCTION;
