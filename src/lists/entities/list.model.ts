import { Column, Model, Table } from 'sequelize-typescript';

export type ListAttributes = {
  name: string;
};

@Table // decorator table para mostrar que vai estar ligado a uma tabela
export class ListModel extends Model<ListAttributes> {
  // coloco o type ListAttributes no generic para o typescript entender que os metodos e propriedades
  // da model List trabalham com os atributos definidos no type ListAttributes
  @Column
  name: string;
}
