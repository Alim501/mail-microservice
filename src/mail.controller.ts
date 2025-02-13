import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'send-registration' })
  async sendRegistration(@Payload() payload: { to: string }) {
    return this.mailService.sendRegistration(payload.to);
  }

  @MessagePattern({ cmd: 'send-forgetassword' })
  async sendForgetPassword(@Payload() payload: { to: string; token: string }) {
    return this.mailService.sendForgetPassword(payload.to, payload.token);
  }
  @MessagePattern({ cmd: 'send-order' })
  async sendPlaceOrder(
    @Payload()
    payload: {
      to: string;
      items: { name: string; quantity: number }[];
    },
  ) {
    return this.mailService.sendPlaceOrder(payload.to, payload.items);
  }
}
