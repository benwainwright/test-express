import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { updateRecordInDynamodb } from "../../business-logic/update-record-in-dynamodb.js";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // Do not use the non-null assertion in real production code!
  const { id } = event.pathParameters!;

  // Do not use the non-null assertion in real production code!
  const data = JSON.parse(event.body!);

  // non-null assertion, see above!
  await updateRecordInDynamodb(id!, data);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result: "success",
    }),
  };
};
