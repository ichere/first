import { User } from '@/datastore/entities';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
