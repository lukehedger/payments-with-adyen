import dotenv from "dotenv";
import { CheckoutAPI, Client } from "@adyen/api-library";

dotenv.config();

const client = new Client({
  apiKey: process.env.ADYEN_PRIVATE_API_KEY,
  environment: "TEST",
});

const checkout = new CheckoutAPI(client);

export async function getPaymentMethods() {
  const paymentMethods = await checkout.paymentMethods({
    channel: "Web",
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
  });

  return paymentMethods;
}

export async function sendPayment() {
  const payment = await checkout.payments({
    amount: { currency: "EUR", value: 1000 },
    channel: "Web",
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
    paymentMethod: {
      encryptedCardNumber: "test_4111111111111111",
      encryptedExpiryMonth: "test_03",
      encryptedExpiryYear: "test_2030",
      encryptedSecurityCode: "test_737",
      type: "scheme",
    },
    reference: "xyz",
  });

  return payment;
}
