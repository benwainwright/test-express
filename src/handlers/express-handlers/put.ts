import { Handler } from "express";
import { updateRecordInDynamodb } from "../../business-logic/update-record-in-dynamodb.js";

export const putHandler: Handler = async (request, response) => {
  const data = request.body;
  const { id } = request.params;
  await updateRecordInDynamodb(id, data);

  response.status(200).json({
    result: "success",
  });
};
