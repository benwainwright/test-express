import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

export const getFromDynamoDb = async (id: string) => {
  const table = process.env[`DATA_TABLE`];
  const client = new DynamoDB({});
  const documentClient = DynamoDBDocumentClient.from(client);
  const command = new GetCommand({
    TableName: table,
    Key: {
      id,
    },
  });

  const response = await documentClient.send(command);

  return response.Item;
};
