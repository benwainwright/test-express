import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

export const deleteFromDynamodb = async (id: string) => {
  const table = process.env[`DATA_TABLE`];
  const client = new DynamoDB({});
  const documentClient = DynamoDBDocumentClient.from(client);
  const command = new DeleteCommand({ TableName: table, Key: { id } });

  await documentClient.send(command);
};
