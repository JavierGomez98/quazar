import cors from "cors";
import express from "express";
import ordersController from "./modules/orders/controllers/orders.controller";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersController);

export default app;
