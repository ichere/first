/* eslint-disable @typescript-eslint/ban-ts-comment */

import { NextFunction, Request, Response } from 'express';

import { StatusCode } from '../codes';
import { expressError } from '../util';

export async function verifyJWTToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> {
  try {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token)
      return res
        .status(StatusCode.PermissionDenied)
        .json({ message: 'Please supply a token in the header' });

    // @ts-ignore
    req.user = user;
    return next();
  } catch (error) {
    return expressError(res, error);
  }
}
