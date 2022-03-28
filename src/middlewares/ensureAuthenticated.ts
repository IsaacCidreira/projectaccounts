import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UserRepositories } from '../modules/accounts/repositories/implementations/UserRepositories';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const autHeader = request.headers.authorization;

  if (!autHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = autHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'e72bf9b6d5adc6f858c2ed3d4c42ee8c',
    ) as IPayload;

    const usersRepository = new UserRepositories();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
