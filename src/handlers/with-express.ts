import serverlessExpress from "@vendia/serverless-express";
import express from "express";
import { deleteHandler } from "./express-handlers/delete";
import { getFromIdHandler } from "./express-handlers/get-id";
import { getHandler } from "./express-handlers/get";
import { postHandler } from "./express-handlers/post";
import { putHandler } from "./express-handlers/put";

const app = express();

app.delete("/:id", deleteHandler);
app.get("/:id", getFromIdHandler);
app.get("/", getHandler);
app.post("/", express.json(), postHandler);
app.put("/:id", express.json(), putHandler);

export const handler = serverlessExpress({ app });
