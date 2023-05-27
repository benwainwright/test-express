import { App, Stack } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import path from "path";

const app = new App();

const stack = new Stack(app, "my-test-stack");

const dataTable = new Table(stack, "my-test-table", {
  partitionKey: {
    name: "id",
    type: AttributeType.STRING,
  },
});

const makeFunction = (id: string, filename: string) =>
  new NodejsFunction(stack, id, {
    bundling: {
      externalModules: [
        "aws-sdk",
        "@aws-sdk/client-dynamodb",
        "@aws-sdk/lib-dynamodb",
      ],
    },
    entry: path.join(__dirname, "..", "handlers", filename),
    environment: {
      DATA_TABLE: dataTable.tableName,
    },
  });

const api = new RestApi(stack, "test-api-stack");

const withExpress = api.root.addResource("with-express");
const withExpressAndId = withExpress.addResource("{id}");

const withExpressFunction = makeFunction(
  `with-express-function`,
  `with-express.ts`
);

dataTable.grantReadWriteData(withExpressFunction);

withExpress.addMethod("POST", new LambdaIntegration(withExpressFunction));
withExpress.addMethod("GET", new LambdaIntegration(withExpressFunction));

withExpressAndId.addMethod("GET", new LambdaIntegration(withExpressFunction));
withExpressAndId.addMethod("PUT", new LambdaIntegration(withExpressFunction));
withExpressAndId.addMethod(
  "DELETE",
  new LambdaIntegration(withExpressFunction)
);

const withoutExpress = api.root.addResource("without-express");
const withoutExpressWithId = withoutExpress.addResource("{id}");

const withoutExpressGetIdFunction = makeFunction(
  `without-express-get-id-function`,
  `raw-lambda-handlers/get-with-id.ts`
);

withoutExpressWithId.addMethod(
  "GET",
  new LambdaIntegration(withoutExpressGetIdFunction)
);
dataTable.grantReadData(withoutExpressGetIdFunction);

const withoutExpressGetFunction = makeFunction(
  `without-express-get-function`,
  `raw-lambda-handlers/get.ts`
);

dataTable.grantReadData(withoutExpressGetFunction);

withoutExpress.addMethod(
  "GET",
  new LambdaIntegration(withoutExpressGetFunction)
);

const withoutExpressPostFunction = makeFunction(
  `without-express-post-function`,
  `raw-lambda-handlers/post.ts`
);
withoutExpress.addMethod(
  "POST",
  new LambdaIntegration(withoutExpressPostFunction)
);
dataTable.grantWriteData(withoutExpressPostFunction);

const withoutExpressPutFunction = makeFunction(
  `without-express-put-function`,
  `raw-lambda-handlers/put.ts`
);
withoutExpressWithId.addMethod(
  "PUT",
  new LambdaIntegration(withoutExpressPutFunction)
);
dataTable.grantWriteData(withoutExpressPutFunction);

const withoutExpressDeleteFunction = makeFunction(
  `without-express-delete-function`,
  `raw-lambda-handlers/delete.ts`
);
withoutExpressWithId.addMethod(
  "DELETE",
  new LambdaIntegration(withoutExpressDeleteFunction)
);
dataTable.grantWriteData(withoutExpressDeleteFunction);
