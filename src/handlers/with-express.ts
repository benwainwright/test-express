const serverlessExpress = require("@vendia/serverless-express");
import { app } from "./express-app.js";

export const handler = serverlessExpress({ app });
