import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './entities/list.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  // importando o sequelize module para a feature
  // crio a configuracao do http module
  imports: [
    SequelizeModule.forFeature([List]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],

  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
