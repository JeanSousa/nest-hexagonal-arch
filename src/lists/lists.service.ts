import { Inject, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ListGatewayInterface } from './gateways/list-gateway-interface';
import { List } from './entities/list.entity';
// REGRA DE NEGOCIO
// Criar uma lista no banco de dados e no CRM externo
// PORT AND ADAPTERS
@Injectable()
export class ListsService {
  constructor(
    // o listGatewayInterface é uma porta
    // faço o registro no module que a listaGatewaySequelize é provida pela interface ListGatewayInterface
    // permitindo assim que não injete a listaGatewaySequelize para não ter acoplamento mas a utilize
    // LIST GATEWAY INTERFACE É UMA PORTA
    @Inject('ListGatewayInterface')
    private listGateway: ListGatewayInterface, // list gateway é do tipo list gateway interface não dependo do squelize
    private httpService: HttpService, // injetando o httpservice do axios
  ) {}

  // CREATE LIST DTO É UMA PORTA
  async create(createListDto: CreateListDto) {
    const list = new List(createListDto.name);
    // agora o create não esta mais acoplado ao sequelize posso passar qualquer coisa aqui desde que seja do contrato do gateway
    await this.listGateway.create(list);
    await lastValueFrom(
      // http://localhost:8000/lists essa rota é chamada ja que registrei na module a base url
      // post retorna um observable
      this.httpService.post('lists', {
        // body
        name: list.name,
      }),
    );

    return list;
  }

  findAll() {
    return this.listGateway.findAll();
  }

  async findOne(id: number) {
    const list = await this.listGateway.findById(id);

    if (!list) {
      throw new Error('List not found');
    }

    return list;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
