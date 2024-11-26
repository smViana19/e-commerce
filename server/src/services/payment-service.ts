import Stripe from "stripe";
import Order from "../models/order";
import { resp, respM } from "../utils/resp";

interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
}


class PaymentService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2024-10-28.acacia',
    });
  }

  async createCheckoutSession(lineItems: LineItem[], orderId: string) {
    try {
      if (!lineItems || lineItems.length === 0) {
        throw new Error('Line items não pode ser vazio');
      }
      return await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://bazzarbrand.vercel.app/payment-success?sessionId={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://bazzarbrand.vercel.app/',
        metadata: {
          orderId,
        },
      });
    } catch (error) {
      throw new Error("Erro ao criar sessão de pagamento")
    }
  }

  async confirmOrderPayment(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      const orderId = session.metadata?.orderId;
      if (session.payment_status === 'paid') {
        await Order.update({ paymentStatus: 'confirmed' }, { where: { id: orderId } });
        return respM(200, "Pagamento confirmado com sucesso");
      } else {
        return respM(400, "Pagamento não efetuado");
      }
    } catch (error) {
      throw new Error("Erro ao confirmar pagamento")
    }
  }
}
export default PaymentService;