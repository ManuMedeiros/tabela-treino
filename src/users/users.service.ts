import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync, compare } from 'bcrypt';
import { PublicUser } from 'src/types/user.types';
import { TipoUsuarioEnum } from 'src/types/types.enum';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  createProfessor(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    newUser.username = `${newUser.nome.toLowerCase()}.${newUser.sobrenome.toLowerCase()}`
    newUser.type = TipoUsuarioEnum.PROFESSOR;
    this.users.push(newUser);

    return {
      ...newUser,
      password: undefined
    };
  }

  createAluno(newUser: UserDto, professorId: string) {
    const professor = this.users.find(user => user.id === professorId && user.type === 'PROFESSOR');
    if (!professor) {
      throw new Error('Professor inválido ou não encontrado.');
    }

    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    newUser.username = `${newUser.nome.toLowerCase()}.${newUser.sobrenome.toLowerCase()}`
    newUser.type = TipoUsuarioEnum.ALUNO;
    newUser.professorId = professor.id;
    this.users.push(newUser);

    return {
      ...newUser,
      password: undefined
    };
  }

  async login(username: string, password: string): Promise<any> {
    const user = this.users.find(u => u.username === username);
    if (!user) {
      throw new HttpException("Usuário não encontrado", HttpStatus.BAD_REQUEST);
    }
    const isEqual = await compare(password, user.password)

    return isEqual
  }

  async getProfessores(): Promise<PublicUser[]> {
    return this.users
    .filter(user => user.type === TipoUsuarioEnum.PROFESSOR)
    .map(({password, ...user}) => user);
  }

  async getAlunos(): Promise<PublicUser[]> {
    return this.users
    .filter(user => user.type === TipoUsuarioEnum.ALUNO)
    .map(({password, ...user}) => user);
  }

  findByUserName(username: string): UserDto | null {
    return this.users.find(user => user.username === username);
  }
}
