import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {User} from "./entities/user.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  Hello() {
    return this.appService.getHello();
  }
}
