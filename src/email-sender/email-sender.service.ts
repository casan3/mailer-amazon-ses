import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './User/user.entity';

@Injectable()
export class EmailSenderService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeMsg(user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Ideactiva!',
        template: './welcome', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.name,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
