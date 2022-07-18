import { Body, Controller, Post } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { User } from './entities/user.entity';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private sender: EmailSenderService) {}

  @Post('/welcome')
  async sendWelcomeMsg(@Body() payload: User) {
    const user = new User(payload.email, payload.name);

    return this.sender.sendWelcomeMsg(user);
  }
}
