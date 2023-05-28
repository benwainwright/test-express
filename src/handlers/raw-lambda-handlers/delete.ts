import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { deleteFromDynamodb } from "../../business-logic/delete-from-dynamodb.js";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // Do not use the non-null assertion in real production code!
  const { id } = event.pathParameters!;

  // non-null assertion, see above!
  await deleteFromDynamodb(id!);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result: "success",
    }),
  };
};
