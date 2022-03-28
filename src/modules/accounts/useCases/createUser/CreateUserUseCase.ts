import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { ICreateDTO } from '../../dtos/ICreateDTO';
import { IUserRepositories } from '../../repositories/IUserRepositories';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepositories')
    private usersRepositories: IUserRepositories,
  ) {}

  async execute({ name, email, password }: ICreateDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepositories.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('user Already exists');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepositories.create({
      name,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
