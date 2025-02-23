import express from "express";
import { SendMessageRequest } from "aws-sdk/clients/sqs";
import dotenv from "dotenv";
import sqs from "../services/aws-connection";

dotenv.config();

const ordersController = express.Router();

const ORDER_QUEUE_URL = process.env.ORDER_QUEUE_URL;

ordersController.post("/order", async (req, res) => {
  const order = { id: Date.now(), ...req.body };

  const params: SendMessageRequest = {
    QueueUrl: ORDER_QUEUE_URL!,
    MessageBody: JSON.stringify(order),
  };

  try {
    await sqs.sendMessage(params).promise();
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error sending message to SQS:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default ordersController;
