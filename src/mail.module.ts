import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  controllers: [MailController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
