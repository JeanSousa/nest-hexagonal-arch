import { of } from 'rxjs';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsService } from './lists.service';

const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null)),
};

describe('ListsService', () => {
  let service: ListsService;
  let listGateway: ListGatewayInMemory;

  beforeEach(() => {
    listGateway = new ListGatewayInMemory();
    service = new ListsService(listGateway, mockHttpService as any);
  });

  it('deve criar uma lista', async () => {
    const list = await service.create({ name: 'my list' });
    expect(listGateway.items).toEqual([list]);
  });
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListsService],
  //   }).compile();
  //   service = module.get<ListsService>(ListsService);
  // });
  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
