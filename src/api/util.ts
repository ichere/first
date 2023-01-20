import { Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import {
  AuthenticationError,
  EntityNotFoundError,
  IllegalArgumentError,
  PermissionDenied
} from '@/utils/errors';

import { StatusCode } from './codes';

type ExpressResponse = {
  message: string;
  data: unknown;
  success: boolean;
};

export const apiResponse = (vars: ExpressResponse): ExpressResponse => {
  return vars;
};

export const expressError = (res: Response, error: unknown): Response => {
  if (error instanceof EntityNotFoundError)
    return res
      .status(StatusCode.NotFound)
      .json(apiResponse({ message: error.message, data: null, success: false }));

  if (error instanceof IllegalArgumentError)
    return res
      .status(StatusCode.BadRequest)
      .json(apiResponse({ message: error.message, data: null, success: false }));

  if (error instanceof PermissionDenied)
    return res
      .status(StatusCode.PermissionDenied)
      .json(apiResponse({ message: error.message, data: null, success: false }));

  if (error instanceof AuthenticationError)
    return res
      .status(StatusCode.Unauthorized)
      .json(apiResponse({ message: error.message, data: null, success: false }));

  if (error instanceof JsonWebTokenError)
    return res
      .status(StatusCode.Unauthorized)
      .json(apiResponse({ message: error.message, data: null, success: false }));

  return res
    .status(StatusCode.InternalServerError)
    .json(apiResponse({ message: 'Internal Server error', data: null, success: false }));
};



