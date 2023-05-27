import express from "express";
import { deleteHandler } from "./express-handlers/delete";
import { getFromIdHandler } from "./express-handlers/get-id";
import { getHandler } from "./express-handlers/get";
import { postHandler } from "./express-handlers/post";
import { putHandler } from "./express-handlers/put";

export const app = express();

app.delete("/:id", deleteHandler);
app.get("/", getHandler);
app.get("/:id", getFromIdHandler);
app.post("/", express.json(), postHandler);
app.put("/:id", express.json(), putHandler);
