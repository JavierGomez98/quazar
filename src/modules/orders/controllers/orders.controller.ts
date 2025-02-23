import express from "express";
import { createOrder, processOrders } from "../services/orders-services";

const ordersController = express.Router();

ordersController.post("/order", createOrder);
ordersController.post("/process-order", processOrders);

export default ordersController;
