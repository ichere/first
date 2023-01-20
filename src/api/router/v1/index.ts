import express from 'express';

import userRouter from '@/api/router/v1/user';

const router = express.Router();
router.use('/user', userRouter);

export default router;
