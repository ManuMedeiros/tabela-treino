import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, isUUID } from 'class-validator';
import { TipoUsuarioEnum } from 'src/types/types.enum';

export class UserDto {
    id: string;

    @ApiProperty({ description: 'login usuário' })
    nome: string;

    @ApiProperty({ description: 'login usuário' })
    sobrenome: string;

    username: string;

    @ApiProperty({ description: 'Senha do usuário' })
    password: string;

    @ApiProperty({ description: 'Tipo de usuário', enum: TipoUsuarioEnum })
    type: TipoUsuarioEnum;

    @ApiProperty({ description: 'ID do professor, se aplicável', required: false })
    professorId?: string;
}
