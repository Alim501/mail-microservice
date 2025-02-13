import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  private async sendEmail(to: string, subject: string, text: string) {
    text = 'TENSHI' + text + 'inst TENSHI tg ';
    await this.transporter.sendMail({
      from: ` <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
    });
  }
  async sendRegistration(to: string) {
    const text = 'Hello';
    this.sendEmail(to, 'Привет от команды Tenshi!', 'Hello');
  }

  async sendForgetPassword(to: string, token: string) {
    const text = `Забыли пароль? ${token}`;
    return this.sendEmail(to, 'Смена пароля', text);
  }

  async sendPlaceOrder(
    to: string,
    items: { name: string; quantity: number }[],
  ) {
    let text = '';
    text += items.map((item) => `${item.name} x${item.quantity}`).join(', ');

    return this.sendEmail(to, 'Заказ', text);
  }
}
