import { Handler } from "express";
import { getAllFromDyanmodb } from "../../business-logic/get-all-from-dynamodb.js";

export const getHandler: Handler = async (_, response) => {
  const results = await getAllFromDyanmodb();
  response.status(200).json(results);
};
