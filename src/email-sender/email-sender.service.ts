import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class EmailSenderService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeMsg(user: User) {
    try {
      const resp = await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Ideactiva!',
        template: './welcome', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.name,
        },
      });
      console.log(resp);
      return { success: 'ok' };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Error sendind email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
