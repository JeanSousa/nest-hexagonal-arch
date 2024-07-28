import { Injectable } from '@nestjs/common';

// camada onde fica as regras de negocios
// a service precisa de um decorator injectable (ela é um provider)
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
