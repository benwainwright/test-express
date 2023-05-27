import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export const insertNewToDynamodb = async <T extends Record<string, unknown>>(
  id: string,
  item: T
) => {
  const table = process.env[`DATA_TABLE`];
  const client = new DynamoDB({});
  const documentClient = DynamoDBDocumentClient.from(client);
  const finalItem = { ...item, id };
  const command = new PutCommand({
    TableName: table,
    ConditionExpression: "attribute_not_exists(id)",
    Item: finalItem,
  });

  await documentClient.send(command);
};
