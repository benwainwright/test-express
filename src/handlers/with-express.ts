import serverlessExpress from "@vendia/serverless-express";
import { app } from "./express-app";

export const handler = serverlessExpress({ app });
