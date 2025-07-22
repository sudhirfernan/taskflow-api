import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Sudhir Fernando, Welcome to task management API!';
  }
}
