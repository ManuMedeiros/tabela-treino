import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TreinoDto } from './treino.dto';
import { treinoService } from './treino.service';

@Controller('treino')
export class TreinoController {
  constructor(private readonly treinoService: treinoService) {}

  @Post()
  createTreino(@Body() treino: TreinoDto) {
    return this.treinoService.createTreino(treino);
  }

  @Get('/:alunoId')
  findById(@Param('alunoId') id: string) {
    return this.treinoService.getTreinoAlunoId(id);
  }

  @Get()
  getTreinos() {
    return this.treinoService.getTreinos();
  }

  @Put('/:alunoId')
  updateTreino(@Param('alunoId') id: string, @Body() treino: TreinoDto){
      this.treinoService.updateTreino(id, treino);
  }

  // @Delete('/:id')
  // remove(@Param('id') id: string){
  //     return this.treinoService.remove(id);
  // }
}
