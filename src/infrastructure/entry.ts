import { App, Stack } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";

const app = new App()

const stack = new Stack(app, "my-test-stack");

const api = new RestApi(stack, 'test-api-stack');


const withExpress = api.root.addResource("/with-express")



