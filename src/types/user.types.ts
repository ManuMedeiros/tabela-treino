import { TipoUsuarioEnum } from './types.enum';

export interface PublicUser {
  id: string;
  nome: string;
  sobrenome: string;
  username: string;
  type: TipoUsuarioEnum;
  professorId?: string;
}
