import autocannon from "autocannon";
import { forceColdStart } from "./force-cold-start";
import { doBenchmark } from "./do-benchmark";

const withExpressFunctionName = `my-test-stack-withexpressfunctionA98E5EA0-ZprzmGsAkZRH`;
const withoutExpressFunctionName = `my-test-stack-withoutexpressgetfunctionD4EFFD4C-QM572fdL9azh`;
const url = `https://ezjj1ac8p8.execute-api.eu-west-2.amazonaws.com/prod`;

const go = async () => {
  console.log(`Resetting cold starts`);
  await forceColdStart(withExpressFunctionName);
  await forceColdStart(withoutExpressFunctionName);

  console.log(`Running first load test`);
  await doBenchmark("Without Express", `${url}/without-express`);

  console.log(`Running second load test`);
  await doBenchmark("With Express", `${url}/with-express`);
};

go().catch((error) => console.log(error));
