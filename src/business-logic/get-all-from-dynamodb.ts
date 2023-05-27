import { DynamoDB } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

export const getAllFromDyanmodb = async () => {
  const table = process.env[`DATA_TABLE`];
  const client = new DynamoDB({});
  const documentClient = DynamoDBDocumentClient.from(client);
  const command = new ScanCommand({
    TableName: table,
  });

  const result = await documentClient.send(command);

  return result.Items;
};
