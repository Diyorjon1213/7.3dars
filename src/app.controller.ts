import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user')
  createUser(
    @Body()
    userData: {
      name: 'string';
      email: 'string';
      password: 'string';
      age: number;
    },
  ) {
    return this.appService.create(userData);
  }

  @Get('/users')
  getAllUsers() {
    return this.appService.findAll();
  }

  @Get('/user/:email')
  findByEmail(@Param('email') email: string) {
    return this.appService.findByEmail(email);
  }

  @Put('/user/:email')
  updateUser(@Param('email') email: string, @Body() updateData) {
    return this.appService.update(email, updateData);
  }

  @Delete('/user/:email')
  removeUser(@Param('email') email: string) {
    return this.appService.remove(email);
  }
}
