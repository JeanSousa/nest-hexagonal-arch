import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './lists/entities/list.model';

// o modulo registra e utiliza tudo da aplicação
// o decorator transforma a classe appModule em modulo
@Module({
  // importação do modulo do sequelize, modulo for root porque esse é o modulo raiz da aplicação
  imports: [
    ListsModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite', //banco
      host: ':memory:', // em memoria pois toda vez que salva reseta a memoria e dados sao resetados
      autoLoadModels: true,
      models: [ListModel],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
