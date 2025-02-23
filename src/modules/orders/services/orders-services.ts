import { SendMessageRequest } from "aws-sdk/clients/sqs";
import sqs from "./aws-connection";
import dotenv from "dotenv";

dotenv.config();

const ORDER_QUEUE_URL = process.env.ORDER_QUEUE_URL!;

export async function createOrder(req: any, res: any) {
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
}

export async function processOrders(req: any, res: any) {
  try {
    res
      .status(200)
      .json({ message: "Order created successfully", body: req.body });
  } catch (error) {
    res.status(500).json({ message: "Error processing orders", error: error });
  }
}
