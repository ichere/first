/* eslint-disable @typescript-eslint/ban-ts-comment */

import express, { Request, Response } from 'express';

import { StatusCode } from '@/api/codes';
import {
  createUserValidator,
  loginUserValidator
} from '@/api/input/validator';
import { apiResponse, expressError } from '@/api/util';
import {
  CreateUserVariables,
  LoginVariables
} from '@/interfaces/service/user';
import { getUserService } from '@/ioc/provider';

const router = express.Router();

router.post('/', [...createUserValidator()], async (req: Request, res: Response) => {
  try {
    const createVars = req.body as CreateUserVariables;
    // @ts-ignore
    const userService = getUserService();
    const user = await userService.create(createVars);

    return res
      .status(StatusCode.Success)
      .json(apiResponse({ message: 'User created', data: user, success: true }));
  } catch (error) {
    return expressError(res, error);
  }
});

router.post('/login', [...loginUserValidator()], async (req: Request, res: Response) => {
  try {
    const loginVars = req.body as LoginVariables;
    // @ts-ignore
    const userService = getUserService();
    const user = await userService.login(loginVars);
    return res
      .status(StatusCode.Success)
      .json(apiResponse({ message: 'User created', data: user, success: true }));
  } catch (error) {
    return expressError(res, error);
  }
});

export default router;
