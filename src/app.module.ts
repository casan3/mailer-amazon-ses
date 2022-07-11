import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EmailSenderModule } from './email-sender/email-sender.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    EmailSenderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
