import { List } from '../entities/list.entity';

// a interface será uma porta
export interface ListGatewayInterface {
  create(list: List): Promise<List>;
  findAll(): Promise<List[]>;
  findById(id: number): Promise<List>;
}
