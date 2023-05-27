import { Handler } from "express";
import { deleteFromDynamodb } from "../../business-logic/delete-from-dynamodb";

export const deleteHandler: Handler = async (request, response) => {
  const { id } = request.params;
  await deleteFromDynamodb(id);
  response.status(200).json({
    result: "success",
  });
};
