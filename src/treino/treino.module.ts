import { Module } from '@nestjs/common';
import { TreinoController } from './treino.controller';
import { treinoService } from './treino.service';

@Module({
    controllers: [TreinoController],
    providers: [treinoService]
})
export class TreinoModule {}
