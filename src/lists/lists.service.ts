import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

// REGRA DE NEGOCIO
// Criar uma lista no banco de dados e no CRM externo
@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List) // decorator do sequelize para injetar a instancia da model (entidade List)
    private listModel: typeof List, // tipando com typeof como tipo da entity
    private httpService: HttpService, // injetando o httpservice do axios
  ) {}

  async create(createListDto: CreateListDto) {
    // ALTO ACOPLAMENTO DE CODIGO SENDO DIFICIL TESTAR E TROCAR OS AGENTES
    const list = await this.listModel.create(createListDto);
    // last value from é um metodo do rxjs que retorna o ultimo valor de post que é um observable
    // so depois disso sigo a requisição
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
    return this.listModel.findAll();
  }

  async findOne(id: number) {
    const list = await this.listModel.findByPk(id);

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
