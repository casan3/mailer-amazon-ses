import { Controller, Get } from '@nestjs/common';
import { EmailSenderService } from './email-sender/email-sender.service';
import { User } from './email-sender/User/user.entity';

@Controller()
export class AppController {
  constructor(private sender: EmailSenderService) {}

  @Get('/welcome')
  async sendWelcomeMsg() {
    const user: User = {
      name: 'Carlos',
      email: 'carlos.sanchez.g@ideactiva.dev',
    };

    await this.sender.sendWelcomeMsg(user);
    return {
      success: 'ok',
    };
  }
}
