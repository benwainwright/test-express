import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getFromDynamoDb } from "../../business-logic/get-from-dynamo.js";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // Do not use the non-null assertion in real production code!
  const { id } = event.pathParameters!;

  // non-null assertion, see above!
  const item = await getFromDynamoDb(id!);
  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};
