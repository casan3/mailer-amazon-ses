import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { EmailSenderService } from './email-sender.service';

describe('EmailSenderService', () => {
  let service: EmailSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailerModule.forRootAsync({
          useFactory: async (config: ConfigService) => ({
            // transport: config.get("MAIL_TRANSPORT"),
            // or
            transport: {
              host: config.get('MAIL_HOST'),
              secure: false,
              auth: {
                user: config.get('MAIL_USER'),
                pass: config.get('MAIL_PASSWORD'),
              },
            },
            defaults: {
              from: `"No Reply" <${config.get('MAIL_FROM')}>`,
            },
            template: {
              dir: join(__dirname, 'templates'),
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [EmailSenderService],
    }).compile();

    service = module.get<EmailSenderService>(EmailSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
