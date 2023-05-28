import { App, Aspects, CfnOutput, Stack } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { NodeJsFunctionBundleAnalyzerAspect } from "cdk-bundle-analyzer";
import path from "path";

import url from "node:url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = new App();

const stack = new Stack(app, "my-test-stack");

const dataTable = new Table(stack, "my-test-table", {
  partitionKey: {
    name: "id",
    type: AttributeType.STRING,
  },
});

Aspects.of(app).add(new NodeJsFunctionBundleAnalyzerAspect());

const makeFunction = (id: string, filename: string) =>
  new NodejsFunction(stack, id, {
    entry: path.join(__dirname, "..", "handlers", filename),
    environment: {
      DATA_TABLE: dataTable.tableName,
    },
    bundling: {
      mainFields: ["module", "main"],
      metafile: true,
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

new CfnOutput(stack, `rest-api-with-express-output`, {
  exportName: `with-express-url`,
  value: api.urlForPath(`/with-express`),
});

new CfnOutput(stack, `get-with-id-without-express-function-output`, {
  exportName: `get-with-id-without-express-function`,
  value: withoutExpressGetIdFunction.functionName,
});

new CfnOutput(stack, `get-id-with-express-function-output`, {
  exportName: `get-id-with-express-function`,
  value: withExpressFunction.functionName,
});

new CfnOutput(stack, `rest-api-without-express-output`, {
  exportName: `without-express-url`,
  value: api.urlForPath(`/without-express`),
});
