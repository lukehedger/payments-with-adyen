import fastify from "fastify";
import { getPaymentMethods, sendPayment } from "./checkout.js";

const server = fastify({ logger: true });

server.post("/checkout/payment", async () => {
  return await sendPayment();
});

server.post("/checkout/paymentMethods", async () => {
  return await getPaymentMethods();
});

const startServer = async () => {
  try {
    await server.listen(1234);
  } catch (err) {
    server.log.error(err);

    process.exit(1);
  }
};

startServer();
