import { Handler } from "express";
import { insertNewToDynamodb } from "../../business-logic/insert-new-to-dynamodb";

export const postHandler: Handler = async (request, response) => {
  const data = request.body;
  await insertNewToDynamodb(data.id, data);

  response.status(200).json({
    result: "success",
  });
};
