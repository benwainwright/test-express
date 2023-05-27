import {
  LambdaClient,
  UpdateFunctionConfigurationCommand,
} from "@aws-sdk/client-lambda";
import randomstring from "randomstring";

export const forceColdStart = async (functionName: string) => {
  const client = new LambdaClient({});

  const command = new UpdateFunctionConfigurationCommand({
    FunctionName: functionName,
    Description: randomstring.generate(),
  });
  await client.send(command);
};
