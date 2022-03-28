import { container } from 'tsyringe';
import { UserRepositories } from '../../modules/accounts/repositories/implementations/UserRepositories';
import { IUserRepositories } from '../../modules/accounts/repositories/IUserRepositories';

container.registerSingleton<IUserRepositories>(
  'UserRepositories',
  UserRepositories,
);
