import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.SMTP_USER,
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    },
  });

  async notifyEmail({ email, text }: NotifyEmailDto) {
    const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Reservify Payment</h2>
      <p>${text}</p>
      <p>Thank you for using Reservify!</p>
      <br />
      <p>If you have any questions, feel free to contact our support.</p>
        <br/>
      <p>Best regards,<br/>Reservify Team</p>
    </div>
  `;

    console.log('notifyEmail: ', email);
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Reservify Payment Confirmation',
      text,
      html,
    });
  }
}
