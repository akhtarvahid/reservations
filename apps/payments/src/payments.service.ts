import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
  });

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    try {
      // Create payment method
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: { token: 'tok_mastercard' },
      });

      // Create and confirm payment intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        payment_method: paymentMethod.id,
        amount: amount * 100, // Convert to cents
        confirm: true,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        receipt_email: email, // Add email receipt
      });

      // Emitting the event to send email notification
      this.notificationsService.emit('notify_email', {
        email,
        text: `Your payment of $${amount} has completed successfully.`,
      });

      return paymentIntent;
    } catch (error) {
      throw new BadRequestException(`Payment failed: ${error.message}`);
    }
  }
}
