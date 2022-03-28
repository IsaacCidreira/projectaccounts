import { ICreateDTO } from '../dtos/ICreateDTO';
import { User } from '../entities/User';
interface IUserRepositories {
  create(data: ICreateDTO): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUserRepositories };
