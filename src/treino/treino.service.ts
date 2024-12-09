import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TreinoDto, TreinoStatusEnum } from './treino.dto';

@Injectable()
export class treinoService {
  private treinos: TreinoDto[] = [];

  createTreino(treinoDto: TreinoDto) {
    treinoDto.status = TreinoStatusEnum.PENDENTE;
    this.treinos.push(treinoDto);

    return {
      ...treinoDto,
      status: undefined,
    };
  }

  async getTreinos() {
    return this.treinos;
  }

  async getTreinoAlunoId(id: string) {
    const treinoAlunoId = this.treinos.filter((t) => t.alunoId === id);
    if (!treinoAlunoId || treinoAlunoId.length === 0) {
      throw new HttpException('Treino não encontrado', HttpStatus.BAD_REQUEST);
    }
    return treinoAlunoId;
  }

  updateTreino(id: string, updateTreinoDto: TreinoDto) {
    const treinoIndex = this.treinos.findIndex((treino) => treino.alunoId === id);
    if (treinoIndex === -1) {
      throw new Error('Treino não encontrado.');
    }

    this.treinos[treinoIndex] = {
      ...this.treinos[treinoIndex],
      ...updateTreinoDto
    };

    return this.treinos[treinoIndex];
  }
}
