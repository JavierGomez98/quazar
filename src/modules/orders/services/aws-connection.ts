import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const sqs = new AWS.SQS({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default sqs;
