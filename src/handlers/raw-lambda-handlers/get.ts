import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getAllFromDyanmodb } from "../../business-logic/get-all-from-dynamodb.js";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const result = await getAllFromDyanmodb();
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
