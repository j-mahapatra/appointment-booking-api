import { Request } from 'express';

export type RequestWithUserDataType = Request & {
  user?: {
    email?: string;
    password?: string;
    role?: string;
  };
};
