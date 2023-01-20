import { Connection } from 'typeorm';

export type GlobalObject = {
  dbClient: Connection;
};
