import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('prefixo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // verbo http, recebe o parametro da rota
  @Get('/teste')
  getHello(): string {
    return this.appService.getHello();
  }
}
