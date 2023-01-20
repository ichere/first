/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

import { StatusCode } from '../codes';

export function parameterValidationMiddleware(): RequestHandler {
  return (req, res, next): any => {
    const errors = validationResult(req);
    const formattedErrorMessage = errors
      .array()
      .map((error) => `${error.param} has ${error.msg}.`)
      .join(`\n`);

    if (!errors.isEmpty()) {
      return res.status(StatusCode.BadRequest).json({ message: formattedErrorMessage });
    }
    return next();
  };
}



export function createUserValidator(): RequestHandler[] {
  return [
    body('userName').isString().notEmpty().withMessage('User name field cannot be empty'),
    body('email').isEmail().notEmpty().withMessage('Provide a valid email address'),
    body('password').isString().notEmpty().withMessage('Password field cannot be empty'),
    
    parameterValidationMiddleware(),
  ];
}

export function loginUserValidator(): RequestHandler[] {
  return [
    body('email').isEmail().notEmpty().withMessage('Provide a valid email address'),
    body('password').isString().notEmpty().withMessage('Password field cannot be empty'),
    parameterValidationMiddleware(),
  ];
}
