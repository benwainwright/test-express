import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { insertNewToDynamodb } from "../../business-logic/insert-new-to-dynamodb";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // Do not use the non-null assertion in real production code!
  const data = JSON.parse(event.body!);

  await insertNewToDynamodb(data.id, data);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result: "success",
    }),
  };
};
