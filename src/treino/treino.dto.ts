import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum TreinoStatusEnum {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
}

class ExercicioDto {
  @ApiProperty({ description: 'Nome do exercício', example: 'Supino reto' })
  @IsString()
  exercicio: string;

  @ApiProperty({ description: 'Série do exercício', example: '3x10' })
  @IsString()
  serie: string;
}

class MusculoDto {
  @ApiProperty({ description: 'Nome do músculo', example: 'Peito' })
  @IsString()
  musculo: string;

  @ApiProperty({
    description: 'Lista de exercícios para o músculo',
    type: [ExercicioDto],
  })
  @ValidateNested({ each: true })
  @Type(() => ExercicioDto)
  exercicios: ExercicioDto[];
}

export class TreinoDto {
  @ApiProperty({
    description: 'ID do aluno relacionado ao treino (opcional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  alunoId?: string;

  @ApiProperty({
    description: 'Status do treino',
    enum: TreinoStatusEnum,
    example: TreinoStatusEnum.PENDENTE,
  })
  @IsEnum(TreinoStatusEnum)
  status: TreinoStatusEnum;

  @ApiProperty({
    description: 'Lista de músculos e exercícios',
    type: [MusculoDto],
  })
  @ValidateNested({ each: true })
  @Type(() => MusculoDto)
  treino: MusculoDto[];
}
