import dotenv from "dotenv";
import sqs from "./aws-connection";

dotenv.config();

const QUEUE_URL = process.env.ORDER_QUEUE_URL!;

const receiveParams = {
  QueueUrl: QUEUE_URL,
  MaxNumberOfMessages: 5,
  VisibilityTimeout: 10,
};

async function processOrders() {
  try {
    const data = await sqs.receiveMessage(receiveParams).promise();

    if (data.Messages) {
      for (const message of data.Messages) {
        console.log("Processing order:", message.Body);

        await sqs
          .deleteMessage({
            QueueUrl: QUEUE_URL,
            ReceiptHandle: message.ReceiptHandle!,
          })
          .promise();
      }
    }
  } catch (error) {
    console.error("Error processing orders:", error);
  }
}

export default processOrders;
