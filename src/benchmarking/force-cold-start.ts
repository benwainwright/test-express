import {
  LambdaClient,
  UpdateFunctionConfigurationCommand,
} from "@aws-sdk/client-lambda";
import randomstring from "randomstring";

export const forceColdStart = async (functionName: string) => {
  try {
    const client = new LambdaClient({ maxAttempts: 10 });

    const command = new UpdateFunctionConfigurationCommand({
      FunctionName: functionName,
      Description: randomstring.generate(),
    });
    await client.send(command);
  } catch {
    await forceColdStart(functionName);
  }
};
