import express from "express";
import { deleteHandler } from "./express-handlers/delete.js";
import { getFromIdHandler } from "./express-handlers/get-id.js";
import { getHandler } from "./express-handlers/get.js";
import { postHandler } from "./express-handlers/post.js";
import { putHandler } from "./express-handlers/put.js";

export const app = express();

app.delete("/with-express/:id", deleteHandler);
app.get("/with-express/", getHandler);
app.get("/with-express/:id", getFromIdHandler);
app.post("/with-express/", express.json(), postHandler);
app.put("/with-express/:id", express.json(), putHandler);
