import { getRepository, Repository } from 'typeorm';
import { ICreateDTO } from '../../dtos/ICreateDTO';
import { User } from '../../entities/User';
import { IUserRepositories } from '../IUserRepositories';

class UserRepositories implements IUserRepositories {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create({
    name,
    email,
    password,
    avatar,
    id,
  }: ICreateDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}
export { UserRepositories };
