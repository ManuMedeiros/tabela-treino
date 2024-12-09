import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post('professor')
    createProfessor(@Body() user: UserDto){
        return this.userService.createProfessor(user);
    }

    @Post('aluno')
    createAluno(@Body() user: UserDto, @Body('professorId') professorId: string){
        return this.userService.createAluno(user, professorId);
    }

    @Get('professores')
    getProfessors(){
        return this.userService.getProfessores();
    }

    @Get('alunos')
    getAlunos(){
        return this.userService.getAlunos();
    }
}
