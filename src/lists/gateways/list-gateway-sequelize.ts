import { InjectModel } from '@nestjs/sequelize';
import { List } from '../entities/list.entity';
import { ListGatewayInterface } from './list-gateway-interface';
import { ListModel } from '../entities/list.model';
import { Injectable } from '@nestjs/common';
// AQUI TENHO MEU ADAPTER QUE IMPLEMTA MINHA PORTA
// devo importar no list module em providers
@Injectable()
export class ListGatewaySequelize implements ListGatewayInterface {
  constructor(
    @InjectModel(ListModel) // essa model tem dependencia do sequelize
    private listModel: typeof ListModel,
  ) {}

  async create(list: List): Promise<List> {
    // Aqui eu tenho o sequelize imbutido no gateway mas o que entra e sai é a entidade LIST pura
    // a service assim não sabe dos detalhes dessa implementacao
    const newList = await this.listModel.create(list);
    list.id = newList.id;
    return list;
  }

  async findAll(): Promise<List[]> {
    const listmodels = await this.listModel.findAll();
    return listmodels.map(
      (listModel) => new List(listModel.name, listModel.id),
    );
  }

  async findById(id: number): Promise<List> {
    const listModel = await this.listModel.findByPk(id);
    if (!listModel) {
      throw new Error('List not found');
    }
    return new List(listModel.name, listModel.id);
  }
}
