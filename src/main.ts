import app from "./app";
import dotenv from "dotenv";
import processOrders from "./modules/orders/services/worker-queue";

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT);
  setInterval(processOrders, 5000);
}

bootstrap();
