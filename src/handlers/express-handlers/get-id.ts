import { Handler } from "express";
import { getFromDynamoDb } from "../../business-logic/get-from-dynamo";

export const getFromIdHandler: Handler = async (request, response) => {
  const { id } = request.params;
  const item = await getFromDynamoDb(id!);
  response.status(200).json(item);
};
